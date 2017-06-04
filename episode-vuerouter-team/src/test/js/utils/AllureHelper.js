/* global allure */

export default class AllureHelper {
  /**
   * Describe the test.
   * @method describeTestBy
   * @param  {String}       description     of allure
   * @param  {String}       story           of allure
   * @param  {allure.SEVERITY.BLOKER}       severity        of allure
   * @param  {test.js.utils.WebdriverConfig}       webdriverConfig to take browserInfo from
   * @return {Promise}                      as defined async
   */
  static async describeTestBy(description, story, severity, webdriverConfig) {
    if (!isEmpty(description)) {
      allure.description(description);
    }
    if (!isEmpty(story)) {
      allure.story(story);
    }
    if (!isEmpty(severity)) {
      allure.addLabel('severity', severity);
    }
    if (!isUndefined(webdriverConfig)) {
      allure.addArgument('browserInfo', JSON.stringify(await webdriverConfig.getBrowserInfo()));
    }
  }
  static scrapeEnvironmentVariables() {
    Object.keys(process.env).sort().forEach(function(theKey, index) {
      allure.addEnvironment(theKey, process.env[theKey]);
    });
  }
}

function isEmpty(str) {
  return (!isUndefined(str) || !str.length);
}

function isUndefined(object) {
  return !object;
}
