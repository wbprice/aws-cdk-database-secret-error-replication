import * as cdk from "@aws-cdk/core";
import { Vpc, InstanceClass, InstanceSize, InstanceType } from "@aws-cdk/aws-ec2";
import { DatabaseInstance, DatabaseInstanceEngine } from "@aws-cdk/aws-rds";
import { Duration } from "@aws-cdk/core";

export class AwsCdkDatabaseSecretErrorReplicationStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "TestVPC");

    const database = new DatabaseInstance(this, "testDatbase", {
      instanceIdentifier: "testDatabase",
      engine: DatabaseInstanceEngine.POSTGRES,
      engineVersion: "10.6",
      instanceClass: InstanceType.of(InstanceClass.BURSTABLE2, InstanceSize.MICRO),
      masterUsername: "gladmin",
      vpc,
      backupRetention: Duration.days(30),
      multiAz: true
    });

    database.addRotationSingleUser();
  }
}
