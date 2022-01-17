import * as cdk from "aws-cdk-lib";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { ExamplePipelineStage } from "./stage";

export class ExamplePipeline extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const githubSecret = secretsmanager.Secret.fromSecretNameV2(
      this,
      "githubSecret",
      "jw-github-token"
    );

    const stage = new ExamplePipelineStage(this, "example-pipeline-stage", {});

    const pipeline = new CodePipeline(this, "ExamplePipeline", {
      pipelineName: "ExamplePipeline",
      synth: new ShellStep("synth", {
        input: CodePipelineSource.gitHub(
          "JessieWooten/example-cdk-pipeline",
          "main",
          {
            authentication: githubSecret.secretValue,
          }
        ),
        commands: ["npm install", "npm run build", "npx cdk synth"],
      }),
    });

    pipeline.addStage(stage, {
      post: [
        new ShellStep("test-lambda", {
          commands: ["curl -Ssf $OUTPUT_URL"],
          envFromCfnOutputs: {
            OUTPUT_URL: stage.urlOutput,
          },
        }),
      ],
    });
  }
}
