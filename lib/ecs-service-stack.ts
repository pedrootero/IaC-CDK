import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Duration } from 'aws-cdk-lib';
import { EcsCluster } from '../lib/ecs-cluster-stack';

export class ServiceEcs extends cdk.Stack {
	readonly service: ecs.FargateService;
	constructor(
		scope: Construct,
		id: string,
		cluster: ecs.Cluster,
		fargateTaskDefinition: ecs.TaskDefinition,
		vpc: ec2.Vpc,
		props?: cdk.StackProps
	) {
		super(scope, id, props);

		const sg_service = new ec2.SecurityGroup(this, 'MySGService', { vpc: vpc });
		sg_service.addIngressRule(ec2.Peer.ipv4('0.0.0.0/0'), ec2.Port.tcp(3000));

		this.service = new ecs.FargateService(this, 'Service', {
			cluster,
			taskDefinition: fargateTaskDefinition,
			desiredCount: 2,
			assignPublicIp: false,
			securityGroups: [sg_service],
		});

		// Setup AutoScaling policy
		const scaling = this.service.autoScaleTaskCount({ maxCapacity: 6, minCapacity: 2 });
		scaling.scaleOnCpuUtilization('CpuScaling', {
			targetUtilizationPercent: 50,
			scaleInCooldown: Duration.seconds(60),
			scaleOutCooldown: Duration.seconds(60),
		});
	}
}
