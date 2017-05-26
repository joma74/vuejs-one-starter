import firefox from 'selenium-webdriver/firefox';
import webdriver from 'selenium-webdriver';

export const FIREFOX_SELENIUMUSER_PROFILE = new firefox.Profile(process.cwd() + '/profiles/firefox/SeleniumUser');

export default class WebdriverConfig {
  constructor() {
    this.driver = null;
    webdriver.until.USE_PROMISE_MANAGER = false;
  }
  async getDriver() {
    if (this.driver === null || this.driver === undefined){
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
}
