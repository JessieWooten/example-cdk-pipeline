import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";

export class LambdaStack extends cdk.Stack {
  public readonly urlOutput: cdk.CfnOutput;
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "example-lambda", {
      code: lambda.Code.fromAsset(path.resolve(__dirname, "./lambdas")),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "handler.handler",
    });

    const api = new apiGateway.LambdaRestApi(this, "example-api", {
      handler,
    });

    this.urlOutput = new cdk.CfnOutput(this, "example-api-url", {
      value: api.url,
    });
  }
}
