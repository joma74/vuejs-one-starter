import firefox from 'selenium-webdriver/firefox';
import webdriver from 'selenium-webdriver';
import {
  Type
} from 'selenium-webdriver/lib/logging';

export const FIREFOX_SELENIUMUSER_PROFILE = new firefox.Profile(process.cwd() + '/profiles/firefox/SeleniumUser');

export default class WebdriverConfig {
  constructor() {
    this.driver = null;
    webdriver.until.USE_PROMISE_MANAGER = false;
  }
  async getDriver() {
    if (this.driver === null || this.driver === undefined) {
      this.driver = await this._createNewDriver();
    }
    return this.driver;
  }
  async _createNewDriver() {
    return await new webdriver.Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(new firefox.Options().setProfile(FIREFOX_SELENIUMUSER_PROFILE))
      .build();
  }
  /**
   * Get the Log from the browser.
   * @method getBrowserLog
   * @return {Promise.<String>[]}     an array of JSON stringified log messages
   */
  async getBrowserLog() {
    if (this.driver === null || this.driver === undefined) {
      return ['{ execution_error: "Driver not ready!" }'];
    }
    try {
      let logEntries = await this.driver.manage().logs().get(Type.BROWSER);
      let logEntriesJSON = logEntries.map(function (logEntry) {
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
