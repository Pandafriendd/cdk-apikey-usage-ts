#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkApiTsStack } from '../lib/cdk-api-ts-stack';

const app = new cdk.App();
new CdkApiTsStack(app, 'CdkApiTsStack');
