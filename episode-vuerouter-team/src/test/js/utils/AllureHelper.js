/* global allure */
export default class AllureHelper {
  /**
   * Describe the test.
   * @method describeTestBy
   * @param  {string} description of allure
   * @param  {string} story of allure
   * @param  {MochaAllureReporter.SEVERITYTYPE} severity of allure
   * @param  {WebdriverConfig} webdriverConfig to take browserInfo from
   * @return {Promise<void>} as defined async
   */
  static async describeTestBy(description, story, severity, webdriverConfig) {
    if (!AllureHelper.isEmpty(description)) {
      allure.description(description, 'text');
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
