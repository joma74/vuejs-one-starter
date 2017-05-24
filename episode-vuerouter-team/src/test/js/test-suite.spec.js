import {
  describe,
  it,
  before,
  after
} from 'mocha';
import {
  chaiConfig
} from './utils/ChaiConfig';
import {
  TIMEOUT_BEFORE_MS
} from './utils/MochaConfig';
import {
  FIREFOX_SELENIUMUSER_PROFILE
} from './utils/FirefoxConfig';
import Screenshotter from './utils/Screenshotter';

import path from 'path';
import WebpackServerSetup from './utils/WebpackServerSetup';

chaiConfig.setDefaults();

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const WDpromise = webdriver.until;
const firefox = require('selenium-webdriver/firefox');

WDpromise.USE_PROMISE_MANAGER = false;

describe('Some Feature', function() {
  let driver;
  let webpackServerSetup;
  let screenShotter;
  let BROWSER_URL;
  before(async function() {
    this.timeout(TIMEOUT_BEFORE_MS);
    // process.env.NODE_ENV = 'development';
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let webpackConfig = require(path.join(process.cwd(), '/webpack.config.js'));
    webpackServerSetup = new WebpackServerSetup(webpackConfig);
    webpackServerSetup.disableVerbosePlugins();
    await webpackServerSetup.start();
    // console.log(`FIREFOX_SELENIUMUSER_PROFILE is >>${process.cwd() + '/profiles/firefox/SeleniumUser'}<<`);
    driver = await new webdriver.Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(new firefox.Options().setProfile(FIREFOX_SELENIUMUSER_PROFILE))
      .build();
    BROWSER_URL = `https://${webpackConfig.devServer.host || 'localhost'}:${webpackConfig.devServer.port}/`;
    screenShotter = new Screenshotter(driver, process.env.npm_package_config_content_base);
  });
  after(async function() {
    await driver.quit();
    await webpackServerSetup.stop();
  });
  it('is working', async function() {
    await driver.get(BROWSER_URL);
    await driver.wait(until.titleIs('vue-routing-team'), 2000);
    await driver.findElement(
      By.css("section[section-test-id='navigation']")
    ).findElement(
      By.css("a[href='/teams']")
    ).click();
    await screenShotter.take(this.test.fullTitle());
  }).timeout(4000);
});
