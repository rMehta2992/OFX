import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
export declare class BeTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps);
  createLambda: (name: string, path: string) => cdk.aws_lambda_nodejs.NodejsFunction;
}
