const oDeployment = require('/opt/nodejs/DeploymentFunctions');

exports.handler = async (event) => {
    oDeployment.outputStartHookDebug('PostTraffic', event);
    const oResponse = await oDeployment.checkPayloadKeyFromLambdaInvoke(process);
    const sStatus = oDeployment.determineStatusFromLambdaResponse(oResponse, 'PostTest');
    return oDeployment.updateLifecycleEventHookExecutionStatus(event, sStatus);
};
