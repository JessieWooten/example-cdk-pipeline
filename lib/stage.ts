import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "./lambda-stack";

export class ExamplePipelineStage extends cdk.Stage {
  public readonly urlOutput: cdk.CfnOutput;
  constructor(scope: Construct, id: string, props: cdk.StageProps) {
    super(scope, id, props);
    const stack = new LambdaStack(this, "example-stack", {});
    this.urlOutput = stack.urlOutput;
  }
}
