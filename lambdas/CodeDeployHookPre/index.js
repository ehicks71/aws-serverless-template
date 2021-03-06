const oDeployment = require('/opt/nodejs/DeploymentFunctions');

exports.handler = async (event) => {
    oDeployment.outputStartHookDebug('PreTraffic', event);
    const oResponse = await oDeployment.checkPayloadKeyFromLambdaInvoke(process);
    const sStatus = oDeployment.determineStatusFromLambdaResponse(oResponse, 'PreTest');
    return oDeployment.updateLifecycleEventHookExecutionStatus(event, sStatus);
};
