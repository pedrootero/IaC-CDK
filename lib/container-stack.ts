import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class ContainerECS extends cdk.Stack {
	constructor(scope: Construct, id: string, table: dynamodb.Table, vpc: ec2.Vpc, props?: cdk.StackProps) {
		super(scope, id, props);

		const cluster = new ecs.Cluster(this, 'Cluster-ecs', {
			vpc: vpc,
		});

		// Create a load-balanced Fargate service and make it public
		new cdk.aws_ecs_patterns.ApplicationLoadBalancedFargateService(this, 'MyFargateService', {
			cluster: cluster, // Required
			cpu: 512, // Default is 256
			desiredCount: 6, // Default is 1
			taskImageOptions: { image: ecs.ContainerImage.fromRegistry('amazon/otero:latest') },
			memoryLimitMiB: 2048, // Default is 512
			publicLoadBalancer: true, // Default is true
		});
	}
}
