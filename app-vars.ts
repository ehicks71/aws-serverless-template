/**
 * If anything in this file is changed you need to do the following for the 
 * changes to take effect.
 * 
 * cd pipeline
 * npm run build
 * cdk deploy [stack]
 */
 
/**
 * @var {string} sAppBucketSlug
 * 
 * Do not add wfu-ait to the sAppBucketSlug. That is automatically done by the pipeline code.
 * Can be any length.
 */
export const sAppBucketSlug = '[bucket slug]';

/**
 * @var {string} sAppInitials
 * 
 * Do not add WfuAit to the sAppInitials. That is automatically done by the pipeline code.
 * Keep the value to a max of3 letters.
 */
export const sAppInitials = '[uppercase initial]';

export const sRepositoryName = '[repo template]';

export const aStackEnvironments = [];
