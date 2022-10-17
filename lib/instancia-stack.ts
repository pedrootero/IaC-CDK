import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';


export class Instancia extends cdk.Stack{
    readonly instanciaType: ec2.InstanceType;
    readonly image: ec2.IMachineImage;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

    this.instanciaType = ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)

    }
}