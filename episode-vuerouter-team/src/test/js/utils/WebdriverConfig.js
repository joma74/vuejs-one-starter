import firefox from 'selenium-webdriver/firefox';
import chrome from 'selenium-webdriver/chrome';
import webdriver from 'selenium-webdriver';
import StringifyError from './StringifyError';


export const FIREFOXSELENIUMUSERPROFILE_LOCATION = process.cwd() + '/profiles/firefox/SeleniumUser';

/**
 * [FIREFOX_SELENIUMUSER_PROFILE the project-relative file location for the firefox profile used while testing ]
 * @type {firefox.Profile}
 */
export const FIREFOX_SELENIUMUSER_PROFILE = new firefox.Profile(FIREFOXSELENIUMUSERPROFILE_LOCATION);

const debug = require('debug')('vuerouter.team.test:js.utils.webdriverconfig');


/**
 * Holder of a selenium-webdriver instance. With unmanaged Promises, to keep
 * you trained with async await.
 * @type {WebdriverConfig}
 */
export default class WebdriverConfig {
  /**
   * With unmanaged Promises
   * @return {WebdriverConfig} a new instance.
   */
  constructor() {
    this.driver = null;
    webdriver.until.USE_PROMISE_MANAGER = false;
  }
  /**
   * Get the configured webdriver.
   * @return {Promise.<webdriver>} the configured webdriver
   */
  async getDriver() {
    if (this.driver === null || this.driver === undefined) {
      this.driver = await this._createNewDriver();
    }
    return this.driver;
  }
  /**
   * Creates a new webdriver
   * - for firefox and chrome
   * - using FIREFOX_SELENIUMUSER_PROFILE
   * - for both browser enabled logging types of
   * -- BROWSER
   * -- DRIVER
   * -- CLIENT
   * If no other override applies e.g. environment variable SELENIUM_BROWSER=xyz,
   * the BROWSER defaults to chrome.
   * @method _createNewDriver
   * @return {Promise.<webdriver>} the new webdriver.
   */
  async _createNewDriver() {
    let loggingPrefs = new webdriver.logging.Preferences();
    loggingPrefs.setLevel(webdriver.logging.Type.BROWSER, webdriver.logging.Level.DEBUG);
    loggingPrefs.setLevel(webdriver.logging.Type.DRIVER, webdriver.logging.Level.INFO);
    let firefoxCapabilities = webdriver.Capabilities.firefox();
    firefoxCapabilities.setLoggingPrefs(loggingPrefs);
    firefoxCapabilities.set('marionette', false);
    let chromeCapabilities = webdriver.Capabilities.chrome();
    chromeCapabilities.setLoggingPrefs(loggingPrefs);
    var options = new chrome.Options();
    // options.options_['debuggerAddress'] = '127.0.0.1:9222';
    debug(options);
    return await new webdriver.Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(new firefox.Options().setProfile(FIREFOX_SELENIUMUSER_PROFILE))
      .withCapabilities(firefoxCapabilities)
      .forBrowser('chrome')
      .withCapabilities(chromeCapabilities)
      .setChromeOptions(options)
      .build();
  }
  /**
   * Get the logs from webdriver.logging.Type.BROWSER.
   * @method getLogFromBrowser
   * @return {Promise<String[]|String[]>}     an array of JSON-stringified
   * log messages. On exception an ...
   */
  async getLogFromBrowser() {
    return this.getLogFrom(webdriver.logging.Type.BROWSER);
  }
  /**
   * Get the logs from webdriver.logging.Type.DRIVER.
   * @method getLogFromDriver
   * @return {Promise<String[]|String[]>}     an array of JSON-stringified
   * log messages. On exception an ...
   */
  async getLogFromDriver() {
    return this.getLogFrom(webdriver.logging.Type.DRIVER);
  }
  /**
   * Get the log from any of the given log source types.
   * @method getLogFrom
   * @param  {webdriver.logging.Type}   webDriverLoggingTypeSource any of the constants of webdriver.logging.Type.
   * @return {Promise<String[]|String[]>}     an array of JSON-stringified log messages
   */
  async getLogFrom(webDriverLoggingTypeSource) {
    if (this.driver === null || this.driver === undefined) {
      return [this._getExecutionErrorFrom(new Error('Driver: not ready!'))];
    }
    try {
      let logEntries = await this.driver.manage().logs().get(webDriverLoggingTypeSource);
      let logEntriesJSON = logEntries.map(function (logEntry) {
        return JSON.stringify(logEntry, null, 2);
      });
      return logEntriesJSON;
    } catch (error) {
      return [this._getExecutionErrorFrom(error)];
    }
  }
  static _getExecutionErrorFrom(error){
    return `{ "execution_error": ${StringifyError.stringifyError(error, null, 2)} }`;
  }
  async getBrowserInfo() {
    if (this.driver === null || this.driver === undefined) {
      return [this._getExecutionErrorFrom(new Error('Driver not ready!'))];
    }
    let capabilities = await this.driver.getCapabilities();
    let browserInfo = {};
    browserInfo[webdriver.Capability.BROWSER_NAME] = capabilities.get(webdriver.Capability.BROWSER_NAME);
    browserInfo[webdriver.Capability.VERSION] = capabilities.get(webdriver.Capability.VERSION);
    browserInfo[webdriver.Capability.PLATFORM] = capabilities.get(webdriver.Capability.PLATFORM);
    return browserInfo;
  }
}

export function getHtmlFrom(webElement) {
  return webElement.getAttribute('outerHTML');
}
