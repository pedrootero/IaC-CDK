import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class VpcStack extends cdk.Stack {
	readonly vpc: ec2.Vpc;

	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		this.vpc = new ec2.Vpc(this, 'Vpc', {
			cidr: '10.0.0.0/16',
			subnetConfiguration: [
				{
					cidrMask: 24,
					subnetType: ec2.SubnetType.PUBLIC,
					name: 'net_test',
					mapPublicIpOnLaunch: true,
				},
			],
		});
	}
}
