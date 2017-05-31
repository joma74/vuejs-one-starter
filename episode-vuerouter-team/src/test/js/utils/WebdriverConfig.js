import firefox from 'selenium-webdriver/firefox';
import webdriver from 'selenium-webdriver';


export const FIREFOXSELENIUMUSERPROFILE_LOCATION = process.cwd() + '/profiles/firefox/SeleniumUser';

/**
 * [FIREFOX_SELENIUMUSER_PROFILE the project-relative file location for the firefox profile used while testing ]
 * @type {firefox.Profile}
 */
export const FIREFOX_SELENIUMUSER_PROFILE = new firefox.Profile(FIREFOXSELENIUMUSERPROFILE_LOCATION);


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
    loggingPrefs.setLevel(webdriver.logging.Type.CLIENT, webdriver.logging.Level.INFO);
    let firefoxCapabilities = webdriver.Capabilities.firefox();
    firefoxCapabilities.setLoggingPrefs(loggingPrefs);
    firefoxCapabilities.set('marionette', false);
    let chromeCapabilities = webdriver.Capabilities.chrome();
    chromeCapabilities.setLoggingPrefs(loggingPrefs);
    return await new webdriver.Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(new firefox.Options().setProfile(FIREFOX_SELENIUMUSER_PROFILE))
      .withCapabilities(firefoxCapabilities)
      .forBrowser('chrome')
      .withCapabilities(chromeCapabilities)
      .build();
  }
  /**
   * Get the Log from the browser.
   * @method getBrowserLog
   * @return {Promise.<String>[]}     an array of JSON-stringified log messages
   */
  async getBrowserLog() {
    if (this.driver === null || this.driver === undefined) {
      return ['{ execution_error: "Driver not ready!" }'];
    }
    try {
      // this.driver.manage().useGeckoDriver(false);
      let logEntries = await this.driver.manage().logs().get(webdriver.logging.Type.BROWSER);
      // console.log(logEntries);
      // console.log(typeof logEntries);
      let logEntriesJSON = logEntries.map(function(logEntry) {
        return JSON.stringify(logEntry, null, 2);
      });
      return logEntriesJSON;
    } catch (error) {
      return [`{ execution_error: ${error.toString()} }`];
    }
  }
  async getDriverLog() {
    if (this.driver === null || this.driver === undefined) {
      return ['{ execution_error: "Driver not ready!" }'];
    }
    try {
      let logEntries = await this.driver.manage().logs().get(webdriver.logging.Type.DRIVER);
      let logEntriesJSON = logEntries.map(function(logEntry) {
        return JSON.stringify(logEntry, null, 2);
      });
      return logEntriesJSON;
    } catch (error) {
      return [`{ execution_error: ${error.toString()} }`];
    }
  }
  async getServerLog() {
    if (this.driver === null || this.driver === undefined) {
      return ['{ execution_error: "Driver not ready!" }'];
    }
    try {
      let logEntries = await this.driver.manage().logs().get(webdriver.logging.Type.SERVER);
      let logEntriesJSON = logEntries.map(function(logEntry) {
        return logEntry.toJSON();
      });
      return logEntriesJSON;
    } catch (error) {
      return [`{ execution_error: ${error.toString()} }`];
    }
  }
}

export function getHtmlFrom(webElement) {
  return webElement.getAttribute('outerHTML');
}
