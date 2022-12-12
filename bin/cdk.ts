#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { Instance } from 'aws-cdk-lib/aws-ec2';
import { Instancia } from '../lib/instancia-type-stack';
import { Elb } from '../lib/elb-stack';
import { EcsCluster } from '../lib/ecs-cluster-stack';
import { TableDynamo } from '../lib/dynamo-stack';
import { ContainerECS } from '../lib/ecs-stack';

const app = new cdk.App();

const stackProperties = {
	env: {
		account: '411453012264',
		region: 'us-east-1',
	},
	tags: {
		cost: 'test_cdk',
	},
};

const vpcStack = new VpcStack(app, 'VpcStack', stackProperties);
const instancia = new Instancia(app, 'Instancia', vpcStack.vpc, stackProperties);
const elb = new Elb(app, 'ELB', vpcStack.vpc, instancia.instanciaType, stackProperties);
const dynamoStack = new TableDynamo(app, 'DynamoTable', stackProperties);
const ecscluster = new EcsCluster(app, 'EcsCluster', dynamoStack.table, vpcStack.vpc, stackProperties);
const EcsClusterteste = new ContainerECS(app, 'EcsClusterTeste', dynamoStack.table, vpcStack.vpc, stackProperties);
ecscluster.addDependency(EcsClusterteste);
/* If you don't specify 'env', this stack will be environment-agnostic.
 * Account/Region-dependent features and context lookups will not work,
 * but a single synthesized template can be deployed anywhere. */

/* Uncomment the next line to specialize this stack for the AWS Account
 * and Region that are implied by the current CLI configuration. */
// env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

/* Uncomment the next line if you know exactly what Account and Region you
 * want to deploy the stack to. */
// env: { account: '123456789012', region: 'us-east-1' },

/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
