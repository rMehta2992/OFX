#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const be_test_stack_1 = require("../lib/be-test-stack");
const app = new cdk.App();
new be_test_stack_1.BeTestStack(app, 'BeTestStack', {
/* If you don't specify 'env', this stack will be environment-agnostic.
 * Account/Region-dependent features and context lookups will not work,
 * but a single synthesized template can be deployed anywhere. */
/* Uncomment the next line to specialize this stack for the AWS Account
 * and Region that are implied by the current CLI configuration. */
// env: { 
//     account: process.env.CDK_DEFAULT_ACCOUNT, 
//     region: process.env.CDK_DEFAULT_REGION 
// }
// /* Uncomment the next line if you know exactly what Account and Region you
//  * want to deploy the stack to. */
//  env: { account: '', region: 'ap-southeast-2' },
/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmUtdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJlLXRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQXFDO0FBQ3JDLG1DQUFtQztBQUNuQyx3REFBbUQ7QUFFbkQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSwyQkFBVyxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUU7QUFDaEM7O2lFQUVpRTtBQUNqRTttRUFDbUU7QUFDbkUsVUFBVTtBQUNWLGlEQUFpRDtBQUNqRCw4Q0FBOEM7QUFDOUMsSUFBSTtBQUNKLDZFQUE2RTtBQUM3RSxxQ0FBcUM7QUFDdkMsbURBQW1EO0FBQ2pELDhGQUE4RjtDQUNqRyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQmVUZXN0U3RhY2sgfSBmcm9tICcuLi9saWIvYmUtdGVzdC1zdGFjayc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5uZXcgQmVUZXN0U3RhY2soYXBwLCAnQmVUZXN0U3RhY2snLCB7XG4gICAgLyogSWYgeW91IGRvbid0IHNwZWNpZnkgJ2VudicsIHRoaXMgc3RhY2sgd2lsbCBiZSBlbnZpcm9ubWVudC1hZ25vc3RpYy5cbiAgICAgKiBBY2NvdW50L1JlZ2lvbi1kZXBlbmRlbnQgZmVhdHVyZXMgYW5kIGNvbnRleHQgbG9va3VwcyB3aWxsIG5vdCB3b3JrLFxuICAgICAqIGJ1dCBhIHNpbmdsZSBzeW50aGVzaXplZCB0ZW1wbGF0ZSBjYW4gYmUgZGVwbG95ZWQgYW55d2hlcmUuICovXG4gICAgLyogVW5jb21tZW50IHRoZSBuZXh0IGxpbmUgdG8gc3BlY2lhbGl6ZSB0aGlzIHN0YWNrIGZvciB0aGUgQVdTIEFjY291bnRcbiAgICAgKiBhbmQgUmVnaW9uIHRoYXQgYXJlIGltcGxpZWQgYnkgdGhlIGN1cnJlbnQgQ0xJIGNvbmZpZ3VyYXRpb24uICovXG4gICAgLy8gZW52OiB7IFxuICAgIC8vICAgICBhY2NvdW50OiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9BQ0NPVU5ULCBcbiAgICAvLyAgICAgcmVnaW9uOiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9SRUdJT04gXG4gICAgLy8gfVxuICAgIC8vIC8qIFVuY29tbWVudCB0aGUgbmV4dCBsaW5lIGlmIHlvdSBrbm93IGV4YWN0bHkgd2hhdCBBY2NvdW50IGFuZCBSZWdpb24geW91XG4gICAgLy8gICogd2FudCB0byBkZXBsb3kgdGhlIHN0YWNrIHRvLiAqL1xuICAvLyAgZW52OiB7IGFjY291bnQ6ICcnLCByZWdpb246ICdhcC1zb3V0aGVhc3QtMicgfSxcbiAgICAvKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9jZGsvbGF0ZXN0L2d1aWRlL2Vudmlyb25tZW50cy5odG1sICovXG59KTtcbiJdfQ==