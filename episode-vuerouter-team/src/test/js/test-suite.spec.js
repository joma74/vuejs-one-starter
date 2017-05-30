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

/* eslint-disable no-unused-expressions */
describe('Application spec', function() {
  let driver;
  let webpackServerSetup;
  let takeScreenshot;
  before(async function() {
    this.timeout(TIMEOUT_BEFORE_MS);
    // process.env.NODE_ENV = 'development';
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let webpackConfig = require(path.join(process.cwd(), '/webpack.config.js'));
    webpackServerSetup = await new WebpackServerSetup(webpackConfig, true).start();
    // console.log('webpackServerSetup.getBaseUrl() >> ' + webpackServerSetup.getBaseUrl());
    // allure.addEnvironment('landingPage', webpackServerSetup.getBaseUrl());
    // console.log(`FIREFOX_SELENIUMUSER_PROFILE is >>${process.cwd() + '/profiles/firefox/SeleniumUser'}<<`);
    driver = await new WebdriverConfig().getDriver();
    let screenShotter = new Screenshotter(driver, process.env.npm_package_config_content_base);
    takeScreenshot = allure.createStep('take screenshot', async(screenShotName) => screenShotter.take()
      .then(
        and => {
          allure.createAttachment(screenShotName, and.getBinaryDataAsBuffer());
        })
    );
  });
  after(async function() {
    await driver.quit();
    await webpackServerSetup.stop();
  });
  it('expect to show landing page', async function() {
    allure.story('Show landing page');
    allure.addLabel('severity', 'blocker');
    let landingPage = await new LandingPage(driver, webpackServerSetup.getBaseUrl()).view(2000);
    await allure.addEnvironment('landingPage', landingPage.getBaseUrl());
    await takeScreenshot('landing-page-screenshot'); // <- da iffe
  });
  it('expect to show team list', async function() {
    allure.story('Show team list');
    allure.addLabel('severity', 'critical');
    let landingPage;
    await allure.createStep('show landing page', async() => {
      landingPage = await new LandingPage(driver, webpackServerSetup.getBaseUrl()).view(2000);
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
