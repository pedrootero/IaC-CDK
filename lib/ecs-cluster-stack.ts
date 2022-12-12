import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as ecr from 'aws-cdk-lib/aws-ecr';
export class EcsCluster extends cdk.Stack {
	constructor(scope: Construct, id: string, table: dynamodb.Table, vpc: ec2.Vpc, props?: cdk.StackProps) {
		super(scope, id, props);

		const cluster = new ecs.Cluster(this, 'Cluster-ecs-test', {
			vpc: vpc,
		});

		const repository = new ecr.Repository(this, 'otero', {
			repositoryName: 'otero',
		});

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

		const fargateTaskDefinition = new ecs.FargateTaskDefinition(this, 'ApiTaskDefinition', {
			memoryLimitMiB: 512,
			cpu: 256,
		});

		fargateTaskDefinition.addToExecutionRolePolicy(executionRolePolicy);
		fargateTaskDefinition.addToTaskRolePolicy(
			new iam.PolicyStatement({
				effect: iam.Effect.ALLOW,
				resources: [table.tableArn],
				actions: ['dynamodb:*'],
			})
		);

		const container = fargateTaskDefinition.addContainer('backend', {
			// Use an image from Amazon ECR
			image: ecs.ContainerImage.fromRegistry(repository.repositoryUri),
			//image: ecs.ContainerImage.fromRegistry("amazon/otero-teste:0.1"),
			logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'workshop-api' }),
			environment: {
				DYNAMODB_TABLE: table.tableName,
				APP_ID: 'my-app',
			},
			// ... other options here ...
		});
		container.addPortMappings({
			containerPort: 3000,
		});
	}
}
