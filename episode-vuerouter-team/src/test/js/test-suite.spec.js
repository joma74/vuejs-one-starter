'use strict';
/* global allure */
import {
  describe,
  it,
  before,
  after
} from 'mocha';
import {
  chaiConfig,
  expect
} from './utils/ChaiConfig';
import {
  TIMEOUT_BEFORE_MS
} from './utils/MochaConfig';
import WebdriverConfig, {
  getHtmlFrom
} from './utils/WebdriverConfig';
import Screenshotter from './utils/Screenshotter';
import LandingPage, {
  NavMenuItemEnum
} from './appcmpnts/LandingPage';

import path from 'path';
import WebpackServerSetup from './utils/WebpackServerSetup';

chaiConfig.setDefaults();

/**
 * The location of webpack.config.js. Must be resolveable relative to the
 * current working directory.
 */
const WEBPACKCONFIGJS_LOCATION = (path.join(process.cwd(), '/webpack.config.js'));

/* eslint-disable no-unused-expressions */
describe('Application spec', function() {
  let webdriverConfig;
  let webpackServerSetup;
  let takeScreenshot;
  let saveBrowserLog;
  let saveDriverLog;
  before(async function() {
    this.timeout(TIMEOUT_BEFORE_MS);
    // process.env.NODE_ENV = 'development';
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let webpackConfig = require(WEBPACKCONFIGJS_LOCATION);
    webpackServerSetup = await new WebpackServerSetup(webpackConfig, true).start();
    webdriverConfig = new WebdriverConfig();
    let screenShotter = new Screenshotter(await webdriverConfig.getDriver(), process.env.npm_package_config_content_base);
    takeScreenshot = allure.createStep('take screenshot', async(screenShotName) => {
          allure.createAttachment(screenShotName, (await screenShotter.take()).getBinaryDataAsBuffer());
    });
    saveBrowserLog = allure.createStep('save browser log', async(logName) => {
      allure.createAttachment(`${logName}.browser.log`, await webdriverConfig.getBrowserLog());
    });
    saveDriverLog = allure.createStep('save driver log', async(logName) => {
      allure.createAttachment(`${logName}.driver.log`, await webdriverConfig.getDriverLog());
    });
  });
  after(async function() {
    webdriverConfig.getDriver().then(driver => driver.quit()); // await applies
    // ONLY to the last method, so parenthese right away. else null/undefined.
    await webpackServerSetup.stop();
  });
  afterEach(async function() {
    await saveBrowserLog(new Date().toISOString());
    await saveDriverLog(new Date().toISOString());
  });
  it('expect to show landing page', async function() {
    allure.story('Show landing page');
    allure.addLabel('severity', 'blocker');
    let landingPage = await new LandingPage(await webdriverConfig.getDriver(), webpackServerSetup.getBaseUrl()).view(2000);
    await allure.addEnvironment('landingPage', landingPage.getBaseUrl());
    await takeScreenshot('landing-page-screenshot'); // <- da iffe
  });
  it('expect to show team list', async function() {
    allure.story('Show team list');
    allure.addLabel('severity', 'critical');
    let landingPage;
    await allure.createStep('show landing page', async() => {
      landingPage = await new LandingPage(await webdriverConfig.getDriver(), webpackServerSetup.getBaseUrl()).view(2000);
      await allure.addEnvironment('landingPage', landingPage.getBaseUrl());
    })();
    await allure.createStep('check number of nav items', async() => {
      expect(3).to.equal(await landingPage.getNavMenu().getNumberOfNavItems());
    })();
    await allure.createStep('check nav item "Teams" exists', async() => {
      let navItemTeams = await landingPage.getNavMenu().getNavItemFor(NavMenuItemEnum.TEAMS);
      allure.createAttachment('web element content', await getHtmlFrom(navItemTeams));
      expect(navItemTeams).to.exist;
    })();
    await allure.createStep('activate nav item "Teams"', async() => {
      await landingPage.getNavMenu().navToTeams();
    })();
    await takeScreenshot('team-list-screenshot'); // <- da iffe
  });
});
