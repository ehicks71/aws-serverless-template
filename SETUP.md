# Setup

* Make sure ESLINT ignores the .MD files and .yaml or .yml files.

1.  Install or update the following command line tools to their latest versions:

    - [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
    - [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
    - [AWS CDK CLI](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_install)

    > If you're working in a Cloud9 environment, you can use a [bootstrap script](https://cicd.serverlessworkshops.io/javascript/setup/bootstrap.html) to update the first two tools. You will still need to update the AWS CDK CLI manually.

2.  Set up the continuous integration (CI) [pipeline](https://github.com/wakeforestuniversity/cdk-typescript-pipeline-base/blob/master/README.md).

3.  Create a Lambda function.

    1.  Navigate to the `lambdas` directory. Create a new directory for the Lambda function.

    2.  Add the Lambda code to that directory.

        **lambdas/DoCoolStuff/index.js**
        ```js
        exports.handler = async (event) => {
          const oResponse = {
            statusCode: 200,
            body: JSON.stringify('Hello World'),
          };
          return oResponse;
        };
        ```

    3.  Create a `package.json` file for the Lambda function by copying the example below or running `npm init`. AWS SAM requires all Lambda functions to have `package.json` files.

        **lambdas/DoCoolStuff/package.json**
        ```json
        {
          "name": "[Lambda Name]",
          "version": "2.0.0",
          "description": "[Description of the Lambda.]",
          "author": "[Your Name] ([Your Email])",
          "license": "ISC",
          "main": "index.js",
          "dependencies": {},
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
          }
        }
        ```

    4.  [Add the Lambda](#lambda) to the app's `template.yaml` file.

        > Use `sam validate` to validate the `template.yaml` file.
        