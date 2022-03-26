# AWS Serverless Template

Use this to build a repo for a CDK application. The app repo will pull in the code to build the pipeline(s) for the CI part of the application.

## Local Development Guide

`sam validate` - Checks if `template.yaml` is valid.

`sam build` - Run this to make changes show up for local testing.

`sam local start-api` - Spins up local version of API. Be sure to restart this after making changes to `template.yaml`.

## File Structure

The app file structure should look like this when you are finished doing all the setup steps.

```
/
  /lambdas
  /layers
  /pipeline
  app-vars.ts
  buildspec.yml
  run-lambdas-install.sh
  run-layers-install.sh
  template.yaml
```

### app-vars.ts

The app-vars.ts defines variables used by the pipeline to allow for customization of the naming of resources in the pipepline to be scoped to the application.

```js
export const sAppBucketSlug = 'serverless-template'; // Any length
export const sAppInitials = 'ST'; // Max 3 letters
export const sRepositoryName = 'aws-cdk-app-template';
```

### buildspec.yml

The buildspec.yml is used by CodeBuild to build the app in preparation for creating the CloudFormation stack and deploying the resources.

### run-install.sh

This file is used by the buildspec.yml to ensure all the Lambdas are build with applicable node_modules so they are ready to be used.

### template.yaml

The template.yaml is where you define all your resources for the app. See the 'Example Resource Defintions' section for examples of how to define commonly used resource types.

## Example Resource Defintions for the SAM Template

Listed below are examples of how to define different types of resources in the template.yml

Note that some of these examples use the ApplicationName and EnvironmentName template parameters.

### API Gateway

For more details: [SAM: API Gateway](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-api.html)

```yaml
  TestRestApi:
    Type: AWS::Serverless::Api
    Properties:
      Description: 'API for Test endpoints.'
      Name: !If [IsProd, !Sub '${ApplicationName}RestApiProd', !If [IsUat, !Sub '${ApplicationName}RestApiUat', !Sub '${ApplicationName}RestApiDev']]
      EndpointConfiguration: REGIONAL
      StageName: !Ref EnvironmentName
      MethodSettings:
        - LoggingLevel: INFO
          ResourcePath: '/*' # allows for logging on any resource
          HttpMethod: '*' # allows for logging on any method
      Tags:
        Name: !If [IsProd, 'TestRestApiProd', !If [IsUat, 'TestRestApiUat', 'TestRestApiDev']]
        Application: !Ref ApplicationName
        Environment: !Ref EnvironmentName
      TracingEnabled: true
      Variables:
        ENVIRONMENT_NAME: !Ref EnvironmentName
```

### DynamoDB

For more details: [SAM: SimpleTable](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-simpletable.html)

```yaml
  TransactionTable:
    Type: AWS::Serverless::SimpleTable # More info about SimpleTable Resource: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-simpletable.html
    Properties:
      PrimaryKey:
        Name: Id
        Type: String
      ProvisionedThroughput:
        ReadCapacityUnits: 1
        WriteCapacityUnits: 1
```

### Lambda

For more details: [SAM: Lambda](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-function.html)

#### Lambda only code

```yaml
  StockBuyerFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: lambdas/stock-buyer/
      Handler: app.lambdaHandler
      Runtime: nodejs14.x
```

#### Lambda with API Gateway event.
```yaml
  TestLambdaPost:
    Type: 'AWS::Serverless::Function'
    Properties:
      Description: 'Lambda function for TestLambda API POST method.'
      CodeUri: lambdas/TestLambda
      AutoPublishAlias: Live
      Tags:
        Name: !If [IsProd, 'TestLambdaPostProd', !If [IsUat, 'TestLambdaPostUat', 'TestLambdaPostDev']]
      Events:
        ApiEvent:
          Type: Api
          Properties:
            Path: /test
            Method: post
            RestApiId:
              Ref: TestRestApi 
```

#### Lambda with CRON event.
```yaml
  TestLambdaPost:
    Type: 'AWS::Serverless::Function'
    Properties:
      Description: 'Lambda function for TestLambda API POST method.'
      CodeUri: lambdas/TestLambda
      AutoPublishAlias: Live
      Tags:
        Name: !If [IsProd, 'TestLambdaPostProd', !If [IsUat, 'TestLambdaPostUat', 'TestLambdaPostDev']]  
      Events:
        CWSchedule:
          Type: Schedule
          Properties:
            Schedule: 'rate(1 day)'
            Description: 'CRON runs daily'
            Enabled: true
```

#### Lambda with DeploymentConfiguration. 
```yaml
  TestLambdaPost:
    Type: 'AWS::Serverless::Function'
    Properties:
      Description: 'Lambda function for TestLambda API POST method.'
      CodeUri: lambdas/TestLambda
      AutoPublishAlias: Live
      Tags:
        Name: !If [IsProd, 'TestLambdaPostProd', !If [IsUat, 'TestLambdaPostUat', 'TestLambdaPostDev']]
      DeploymentPreference:
        Type: !If [IsProd, Canary10Percent5Minutes, AllAtOnce]
        TriggerConfiguration: 
          - TriggerTargetArn: !Ref DeploymentAlertTopic
            TriggerName: DeploymentAlerts
            TriggerEvents:
              - DeploymentStart
              - DeploymentSuccess
              - DeploymentFailure
              - DeploymentStop
              - DeploymentRollback 
        Hooks:
          PreTraffic: !Ref PreTestLambdaPost
          PostTraffic: !Ref PostTestLambdaPost
```

In order to get the correct deployment type look at the [pre-defined deployment configurations](https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined-lambda).  Find the one you want to use and then remove 'CodeDeployDefault.Lambda' from the Deployment Configuration Name to get the appropriate type for use in the `template.yaml` file.

#### Lambda Layer

```yaml
  DeploymentTesting:
    Type: AWS::Serverless::LayerVersion
    Properties:
      LayerName: !If [IsProd, 'DeploymentTestingProd', !If [IsUat, 'DeploymentTestingUat', 'DeploymentTestingDev']]
      Description: 'Layer of functions for the Pre/Post hook traffic Lambdas.'
      ContentUri: layers/DeploymentTesting
      CompatibleRuntimes:
        - nodejs12.x
        - nodejs14.x
      RetentionPolicy: Retain
      Tags:
        Name: !If [IsProd, 'DeploymentTestingProd', !If [IsUat, 'DeploymentTestingUat', 'DeploymentTestingDev']]
        Application: !Ref ApplicationName
        Environment: !Ref EnvironmentName
```

### SNS Topics / Subscriptions

```yaml
  DeploymentAlertTopic:
    Type: 'AWS::SNS::Topic'
    Properties:
      Tags:
        - Key: Name
          Value: !If [IsProd, 'DeploymentAlertTopicProd', !If [IsUat, 'DeploymentAlertTopicUat', 'DeploymentAlertTopicDev']]
        - Key: Application
          Value: !Ref ApplicationName
        - Key: Environment
          Value: !Ref EnvironmentName

  DeploymentAlertSubscription:
    Type: 'AWS::SNS::Subscription'
    Properties:
      Endpoint: 'email@email.com'
      Protocol: 'email'
      TopicArn: !Ref DeploymentAlertTopic
```

### State Machine

For more details: [SAM: State Machine](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-statemachine.html)

```yaml
  StockTradingStateMachine:
    Type: AWS::Serverless::StateMachine # More info about State Machine Resource: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-statemachine.html
    Properties:
      DefinitionUri: statemachine/stock_trader.asl.json
      DefinitionSubstitutions:
        StockCheckerFunctionArn: !GetAtt StockCheckerFunction.Arn
        StockSellerFunctionArn: !GetAtt StockSellerFunction.Arn
        StockBuyerFunctionArn: !GetAtt StockBuyerFunction.Arn
        DDBPutItem: !Sub arn:${AWS::Partition}:states:::dynamodb:putItem
        DDBTable: !Ref TransactionTable
      Events:
        HourlyTradingSchedule:
          Type: Schedule # More info about Schedule Event Source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-property-statemachine-schedule.html
          Properties:
            Description: Schedule to run the stock trading state machine every hour
            Enabled: False # This schedule is disabled by default to avoid incurring charges.
            Schedule: 'rate(1 hour)'
      Policies: # Find out more about SAM policy templates: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-templates.html
        - LambdaInvokePolicy:
            FunctionName: !Ref StockCheckerFunction
        - LambdaInvokePolicy:
            FunctionName: !Ref StockSellerFunction
        - LambdaInvokePolicy:
            FunctionName: !Ref StockBuyerFunction
        - DynamoDBWritePolicy:
            TableName: !Ref TransactionTable
```
