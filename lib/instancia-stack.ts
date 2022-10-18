import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {readFileSync} from 'fs';


export class Instancia extends cdk.Stack{
    readonly instanciaType: ec2.InstanceType;

    constructor(scope: Construct, id: string, vpc: ec2.Vpc, props?: cdk.StackProps) {
        super(scope, id, props);

        this.instanciaType = ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)
        const image = ec2.MachineImage.latestAmazonLinux()

        const userDataScript = readFileSync('./lib/user-data.sh', 'utf8');
        
        const instancia = new ec2.Instance(this, "instanciaEc2", {
            instanceType: this.instanciaType,
            machineImage: image,
            vpc: vpc,
            
            })
        
        instancia.addUserData(userDataScript)
    
    }
}