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
import WebdriverConfig from './utils/WebdriverConfig';
import Screenshotter from './utils/Screenshotter';
import LandingPage from './appcmpnts/LandingPage';

import path from 'path';
import WebpackServerSetup from './utils/WebpackServerSetup';

chaiConfig.setDefaults();

describe('Some Feature', function() {
  let driver;
  let webpackServerSetup;
  let screenShotter;
  before(async function() {
    this.timeout(TIMEOUT_BEFORE_MS);
    // process.env.NODE_ENV = 'development';
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let webpackConfig = require(path.join(process.cwd(), '/webpack.config.js'));
    webpackServerSetup = await new WebpackServerSetup(webpackConfig, true).start();
    // console.log(`FIREFOX_SELENIUMUSER_PROFILE is >>${process.cwd() + '/profiles/firefox/SeleniumUser'}<<`);
    driver = await new WebdriverConfig().getDriver();
    screenShotter = new Screenshotter(driver, process.env.npm_package_config_content_base);
  });
  after(async function() {
    await driver.quit();
    await webpackServerSetup.stop();
  });
  it('is working', async function() {
    let landingPage = await new LandingPage(driver, webpackServerSetup.getBaseUrl()).view(2000);
    await landingPage.getNavMenu().navToTeams();
    await screenShotter.take().then(and => {
      and.fileUnder(this.test.fullTitle());
    });
  }).timeout(4000);
});
