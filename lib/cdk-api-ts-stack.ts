import * as cdk from '@aws-cdk/core';

import * as apigw from '@aws-cdk/aws-apigateway';

export class CdkApiTsStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here


        const ap_api = new apigw.RestApi(this, 'alpha-price-mule-api', { deploy: false });
        
        
        const ap_deployment = new apigw.Deployment(this, 'ap-deployment', {api: ap_api});
        new apigw.Stage(this, 'ap-stage', {
          deployment: ap_deployment,
          stageName: 'Prod'
        });
        
        const ap_deployment2 = new apigw.Deployment(this, 'ap-deployment2', {api: ap_api});
        const stagename = new apigw.Stage(this, 'ap-stage2', {
          deployment: ap_deployment2,
          stageName: 'Stage'
        });
        
        ap_api.deploymentStage = stagename;
        
        ap_api.root.addMethod('ANY');
        
        const key_mule = ap_api.addApiKey('ApiKey', {
          apiKeyName: 'mule'
        });

        const plan = ap_api.addUsagePlan('Usage-plan-mule', {
            name: 'mule',
            apiKey: key_mule,
            throttle: {
                rateLimit: 100,
                burstLimit: 200
            }
        });

        plan.addApiStage({
            //stage: stagename,
            stage: ap_api.deploymentStage,
            api: ap_api
        });

    }
}
