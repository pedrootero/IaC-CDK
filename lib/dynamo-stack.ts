import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class TableDynamo extends cdk.Stack {
	readonly table: dynamodb.Table;

	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		this.table = new dynamodb.Table(this, 'TableTest', {
			tableName: 'TableTest',
			partitionKey: {
				name: 'id',
				type: dynamodb.AttributeType.STRING,
			},
			sortKey: {
				name: 'sk',
				type: dynamodb.AttributeType.STRING,
			},
			timeToLiveAttribute: 'ttl',
			billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code
		});

		new CfnOutput(this, 'CfnTableTest', { value: this.table.tableName });
	}
}
