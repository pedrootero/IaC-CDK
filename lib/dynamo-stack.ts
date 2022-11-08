import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { CfnDisk } from 'aws-cdk-lib/aws-lightsail';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class TableDynamo extends cdk.Stack {
	readonly table: dynamodb.Table;

	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		this.table = new dynamodb.Table(this, 'TableTest', {
			partitionKey: {
				name: 'app_id',
				type: dynamodb.AttributeType.STRING,
			},
			sortKey: {
				name: 'created_at',
				type: dynamodb.AttributeType.NUMBER,
			},
			billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code
		});

		//new CfnOutput(this, 'TableTest', { value: this.table.tableName });
	}
}
