# Upgrade

## Upgrading NodeJS

When it's time to upgrade the nodejs runtime refer to the [available runtimes](https://docs.aws.amazon.com/codebuild/latest/userguide/available-runtimes.html) page for the highest version of nodejs that has an Amazon Linux image.  That is the highest nodejs version you can upgrade to using CodeBuild.

> For example, as of July 2021, Lambdas support nodejs14 but there is no Amazon Image with nodejs14 so CodeBuild does not support it.  So the highest version of node available is nodejs12.

So over time as you upgrade keep referring to the available runtimes list to determine what version of nodejs you can upgrade to.

Once you have determined the nodejs version you'll need to make changes to these 2 files:
- buildspec.yml
- template.yaml

In the `buildspec.yml` change the nodejs version in this block of code:
```yaml
  install:
    runtime-versions:
      nodejs: 12
```

In the `template.yaml` change the runtime nodejs version in this block of code.
```yaml
Globals:
  ...
  # Defaults for all Lambda functions.
  Function:
    ...
    Runtime: nodejs12.x
```

You must be using the same version in both of these places or when you run the Lambda you'll get a message about them not matching.  If they aren't the same your code will NOT build, so it's important that you test the Lambda.
