#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ExampleCdkPipelineStack } from "../lib/example-cdk-pipeline-stack";
import { ExamplePipeline } from "../lib/pipeline";

const app = new cdk.App();
new ExamplePipeline(app, "ExamplePipeline", {});
app.synth();
