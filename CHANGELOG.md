## Application Versioning

1.0.0 (YYYY-MM-DD)

* Setting up initial serverless app for [application name].

## Template Versioning

1.3.3 (2021-09-16)

* Adding default stack environment array to app-vars.ts.

1.3.2 (2021-09-03)

* Updating the layer versions in the template.yaml and in the README.

1.3.1 (2021-08-20)

* Switching SNS tags to be a list and removing tags from subscription.
* Correcting layer path for pre/post hooks.

1.3.0 (2021-08-20)

* Moving the layers to their own app and renaming to reset versioning.
* Adding in the code to call the global functions layer.
* Adding example code for how to call the deployment functions layer.

1.2.0 (2021-08-12)

* Adding tags to all the template resources in the template and README.
* Divide README content out into SETUP and UPGRADE files.

1.1.3 (2021-08-10)

* Uppercasing FUNCTION_VALUE in the WfuPrePostHooks layer.

1.1.2 (2021-08-10)

* Setting correct permissions for run-layers-install.sh.

1.1.1 (2021-08-10)

* Adding missing files:
   * run-lambdas-install.sh
   * run-layers-install.sh
   * layers/WfuFuntions/*
   * layers/WfuPrePostHooks/*

1.1.0 (2021-08-10)

* Refining template.

1.0.0 (2021-08-04)

* Setting up initial template.
