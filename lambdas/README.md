# Lambdas

Add your Lambda functions under this directory.  Make sure each function is in its own directory with the name of the function.

## Folder Structure

Here is visualization for what the folder structure should look like.

```
/functions
  /MyCoolLambda
    - index.js
    - package.json
```

## Lambda Setup

For each Lambda you need to do the following:

1. Make a directory named for the Lambda.

2. Add the Lambda code to that directory.

3. All Lambdas must have a package.json.
    You can run this command and it'll walk you through creating a package.json.
    ```
    npm init
    ```
    or you can copy this and create one manually
    ```
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

4. Add the Lambda to the template.yaml (located in the root of your app).
