import * as cdk from 'aws-cdk-lib';
import { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { InstanceType } from 'aws-cdk-lib/aws-ec2';
import { readFileSync } from 'fs';

//Classe PropsElb criada para não precisar passar um por um os paramentros dentro do construtor da classe ELB
/* 
interface PropsElb extends cdk.StackProps {
	readonly vpc: ec2.Vpc;
	readonly instanceType: InstanceType;
} */

// Devido a estar usando o obejto instanceType já criado em outra stack/classe, é necessário passa-la como parâmetro no construtor do ELB.

//Como o ELB extends o cdk.stack é necessário passar os parametros criados mais o cdk.StackProps
export class Elb extends cdk.Stack {
	constructor(scope: Construct, id: string, vpc: ec2.Vpc, instanceType: InstanceType, props?: cdk.StackProps) {
		super(scope, id, props);

		const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
			vpc: vpc,
			internetFacing: true,
			loadBalancerName: 'ELB-CDK-test',
		});

		const listener = lb.addListener('Listener', {
			port: 80,

			// 'open: true' is the default, you can leave it out if you want. Set it
			// to 'false' and use `listener.connections` if you want to be selective
			// about who can access the load balancer.
			open: true,
		});

		// Create an AutoScaling group and add it as a load balancing
		// target to the listener.

		/* Como esta sendo criado o objeto  machineImage agora dentro da classe não é necessário passa-lo como parâmetro dentro do construtor do ELB, apenas criado dentro das propriedades
        do props do metodo  AutoScalingGroup
         */

		const asg = new AutoScalingGroup(this, 'autoscaling-group', {
			vpc: vpc,
			machineImage: ec2.MachineImage.latestAmazonLinux(),
			instanceType: instanceType,
		});
		const userDataScript = readFileSync('./lib/user-data.sh', 'utf8');

		asg.addUserData(userDataScript);

		listener.addTargets('default_target', {
			port: 80,
			targets: [asg],
		});
	}
}
