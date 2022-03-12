# Layers

Add application specific Lambda Layers under this directory.  Make sure each layers is in its own directory with the name of the function.

## Folder Structure

Here is visualization for what the folder structure should look like.

```
/layers
  /MyCoolLayer
    /nodejs
      - MyCoolLayer.js
      - package.json
```
      
## Layers Setup

For each layer you need to do the following:

1. Make a directory named for the Layer.

2. Add a subdirectory named nodejs.

3. In the nodejs directory add a file named uniquely. (I recommend naming it the same as the Layer directory.)

4. Add the code to that file.

5. All Lambda layers must have a package.json.
    You can run this command and it'll walk you through creating a package.json.
    ```
    npm init
    ```
    or you can copy this and create one manually
    ```
    {
      "name": "[Layer Name]",
      "version": "2.0.0",
      "description": "[Description of the Layer.]",
      "author": "[Your Name] ([Your Email])",
      "license": "ISC",
      "main": "index.js",
      "dependencies": {},
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      }
    }
    ```

6. Add the Layer to the template.yaml (located in the root of your app).

## Using Layers

### Custom JS code in Layers

For accessing custom js files inside a layer the path will be as follows:
```
   '/opt/nodejs/[LayerFileName]'
```

Example require statement.
```
   const oGlobalFunctions = require('/opt/nodejs/WfuFunctions');
```

### Node Modules in Layers

Accessing node modules in a layer is no different than accessing them if they were in node_modules inside your Lambda.

Example require statement.
```
   const oAws = require('aws-sdk');
```
