/* global allure */
export default class AllureHelper {
  /**
   * Describe the test.
   * @method describeTestBy
   * @param  {String}       description     of allure
   * @param  {String}       story           of allure
   * @param  {AllureRuntime.SEVERITY}       severity        of allure
   * @param  {src.test.js.utils.WebdriverConfig}       webdriverConfig to take browserInfo from
   * @return {Promise}                      as defined async
   */
  static async describeTestBy(description, story, severity, webdriverConfig) {
    if (!AllureHelper.isEmpty(description)) {
      allure.description(description);
    }
    if (!AllureHelper.isEmpty(story)) {
      allure.story(story);
    }
    if (!AllureHelper.isEmpty(severity)) {
      allure.severity(severity);
    }
    if (!AllureHelper.isUndefined(webdriverConfig)) {
      allure.addArgument('browserInfo', JSON.stringify(await webdriverConfig.getBrowserInfo()));
    }
  }
  static scrapeEnvironmentVariables() {
    Object.keys(process.env).sort().forEach(function (theKey, index) {
      allure.addEnvironment(theKey, process.env[theKey]);
    });
  }
  static isEmpty(str) {
    return (this.isUndefined(str) || !str.length);
  }
  static isUndefined(object) {
    return (object === undefined || object === null);
  }
}
