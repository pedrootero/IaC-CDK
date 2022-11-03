import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';

export class EcsCluster extends cdk.Stack {
	constructor(scope: Construct, id: string, vpc: ec2.Vpc, props?: cdk.StackProps) {
		super(scope, id, props);

		const cluster = new ecs.Cluster(this, 'Cluster-ecs-test', {
			vpc: vpc,
		});
	}
}
