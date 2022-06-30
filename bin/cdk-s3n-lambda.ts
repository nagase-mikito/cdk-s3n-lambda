#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkS3NLambdaStack } from '../lib/cdk-s3n-lambda-stack';

const app = new cdk.App();
new CdkS3NLambdaStack(app, 'CdkS3NLambdaStack', {});