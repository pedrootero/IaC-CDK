import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { EcsLaunchTargetConfig } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Method } from 'aws-cdk-lib/aws-apigateway';

export class EcsCluster extends cdk.Stack {
	readonly cluster: ecs.Cluster;
	readonly fargateTaskDefinition: ecs.FargateTaskDefinition;

	constructor(scope: Construct, id: string, table: dynamodb.Table, vpc: ec2.Vpc, props?: cdk.StackProps) {
		super(scope, id, props);

		this.cluster = new ecs.Cluster(this, 'Cluster-Otero', {
			vpc: vpc,
		});

		let repository;

		repository = ecr.Repository.fromRepositoryName(this, 'repo-otero', 'otero');
		//}

		/* this.cluster.addCapacity('DefaultAutoScalingGroupCapacity', {
			instanceType: new ec2.InstanceType('t2.micro'),
			desiredCapacity: 3,
		}); */
		/* 
		const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TaskDef');

		taskDefinition.addContainer('DefaultContainer', {
			image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
			memoryLimitMiB: 512,
		}); */

		const executionRolePolicy = new iam.PolicyStatement({
			effect: iam.Effect.ALLOW,
			resources: ['*'],
			actions: [
				'ecr:GetAuthorizationToken',
				'ecr:BatchCheckLayerAvailability',
				'ecr:GetDownloadUrlForLayer',
				'ecr:BatchGetImage',
				'logs:CreateLogStream',
				'logs:PutLogEvents',
			],
		});
		this.fargateTaskDefinition = new ecs.FargateTaskDefinition(this, 'ApiTaskDefinition', {
			memoryLimitMiB: 512,
			cpu: 256,
		});

		this.fargateTaskDefinition.addToExecutionRolePolicy(executionRolePolicy);
		this.fargateTaskDefinition.addToTaskRolePolicy(
			new iam.PolicyStatement({
				effect: iam.Effect.ALLOW,
				resources: [table.tableArn],
				actions: ['dynamodb:*'],
			})
		);

		const container = this.fargateTaskDefinition.addContainer('backend', {
			// Use an image from Amazon ECR
			image: ecs.ContainerImage.fromRegistry(process.env.CONTAINER_URI || '11453012264.dkr.ecr.us-east-1.amazonaws.com/otero:latest'),
			//image: ecs.ContainerImage.fromRegistry("amazon/otero-teste:0.1"),
			logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'teste' }),
			environment: {
				DYNAMODB_TABLE: table.tableName,
				APP_ID: 'my-app',
			},
			// ... other options here ...
		});

		container.addPortMappings({
			containerPort: 80,
		});
	}
}
