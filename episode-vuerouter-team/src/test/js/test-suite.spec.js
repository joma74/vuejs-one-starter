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


import path from 'path';
import fs from 'fs';
import WebpackServerSetup from './utils/WebpackServerSetup';

chaiConfig.setDefaults();

const webdriver = require('selenium-webdriver');
const until = webdriver.until;
const WDpromise = webdriver.until;
const firefox = require('selenium-webdriver/firefox');

WDpromise.USE_PROMISE_MANAGER = false;

describe('Some Feature', function () {
  let driver;
  let webpackServerSetup;
  let webpackConfig;
  before(async function () {
    this.timeout(TIMEOUT_BEFORE_MS);
    // process.env.NODE_ENV = 'development';
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    webpackConfig = require(path.join(process.cwd(), '/webpack.config.js'));
    webpackServerSetup = new WebpackServerSetup(webpackConfig);
    webpackServerSetup.disableVerbosePlugins();
    await webpackServerSetup.start();
    driver = await new webdriver.Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(new firefox.Options().setProfile(FIREFOX_SELENIUMUSER_PROFILE))
      .build();
  });
  after(async function () {
    await driver.quit();
    await webpackServerSetup.stop();
  });
  it('is working', async function () {
    let BROWSER_URL = `https://${webpackConfig.devServer.host || 'localhost'}:${webpackConfig.devServer.port}/`;
    // console.log(await doRequest(BROWSER_URL));
    await driver.get(BROWSER_URL);
    await driver.wait(until.titleIs('vue-routing-team'), 3000);
    driver.takeScreenshot().then(function (data) {
      fs.writeFileSync(process.env.npm_package_config_content_base + '/index.png', data, 'base64');
    });
  }).timeout(30000);
});
