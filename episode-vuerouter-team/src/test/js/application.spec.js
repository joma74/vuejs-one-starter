/* eslint-env mocha */
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
import {
  TeamListItemEnum
} from './appcmpnts/TeamList';

import path from 'path';
import WebpackServerSetup from './utils/WebpackServerSetup';
import AllureHelper from './utils/AllureHelper';


chaiConfig.setDefaults();

/**
 * The location of webpack.config.js. Must be resolveable relative to the
 * current working directory.
 */
const WEBPACKCONFIGJS_LOCATION = (path.join(process.cwd(), '/webpack.config.js'));

/* eslint-disable no-unused-expressions */
describe('Application spec', function () {
  let saveBrowserLog;
  let saveDriverLog;
  let showLandingPage;
  let takeScreenshot;
  let webdriverConfig;
  let webpackServerSetup;
  before(async function () {
    this.timeout(TIMEOUT_BEFORE_MS);
    let webpackConfig = require(WEBPACKCONFIGJS_LOCATION);
    webpackServerSetup = await new WebpackServerSetup(webpackConfig, true).start();
    webdriverConfig = new WebdriverConfig();
    let driver = await webdriverConfig.getDriver();
    let screenShotter = new Screenshotter(driver, process.env.npm_package_config_content_base);
    takeScreenshot = allure.createStep('take screenshot', async(screenShotName) => {
      allure.createAttachment(screenShotName, (await screenShotter.take()).getBinaryDataAsBuffer());
    });
    saveBrowserLog = allure.createStep('save browser log', async(logName) => {
      allure.createAttachment(`${logName}.browser.log`, await webdriverConfig.getLogFromBrowser());
    });
    saveDriverLog = allure.createStep('save driver log', async(logName) => {
      allure.createAttachment(`${logName}.driver.log`, await webdriverConfig.getLogFromDriver());
    });
    showLandingPage = allure.createStep('show landing page', async() => {
      let landingPage = await new LandingPage(driver, webpackServerSetup.getBaseUrl()).view(2000);
      await allure.addArgument('landingPage', landingPage.getBaseUrl());
      return landingPage;
    });
  });
  after(async function () {
    webdriverConfig.getDriver().then(driver => driver.quit()); // await applies
    // ONLY to the last method, so parenthese right away. else null/undefined.
    await webpackServerSetup.stop();
  });
  afterEach(async function () {
    AllureHelper.scrapeEnvironmentVariables();
    await saveBrowserLog(new Date().toISOString());
    await saveDriverLog(new Date().toISOString());
  });
  it('expect to show landing page', async function () {
    await AllureHelper.describeTestBy('Opens the default address in the browser. Expectation is to get the index.html served and thereby the landing page rendered.' //
      , 'Show landing page' //
      , allure.SEVERITY.BLOCKER,
      webdriverConfig);
    await showLandingPage();
    await takeScreenshot('landing-page-screenshot');
  });
  it('expect to show team list', async function () {
    await AllureHelper.describeTestBy('Clicks the nav menu item \'Teams\'. Expectation is to get the team list displayed.' //
      , 'Show team list' //
      , allure.SEVERITY.CRITICAL,
      webdriverConfig);
    let landingPage = await showLandingPage();
    let navMenu = landingPage.getNavMenu();
    await allure.createStep('check number of nav items', async() => {
      expect(3).to.equal(await navMenu.getNumberOfNavItems());
    })();
    await allure.createStep('check nav item "Teams" exists', async() => {
      let navItemTeams = await navMenu.getNavItemFor(NavMenuItemEnum.TEAMS);
      allure.createAttachment('web element content', await getHtmlFrom(navItemTeams));
      expect(navItemTeams).to.exist;
    })();
    await allure.createStep('activate nav item "Teams"', async() => {
      await navMenu.navToTeams();
    })();
    let teamList = navMenu.getTeamList();
    await allure.createStep('check number of team list items', async() => {
      expect(12).to.equal(await teamList.getNumberOfTeamListItems());
    })();
    await takeScreenshot('team-list-screenshot');
  });
  it('expect to have teams in team list', async function () {
    await AllureHelper.describeTestBy('Check the team items list. Expectation is to get some teams displayed.' //
      , 'Check team list' //
      , allure.SEVERITY.NORMAL,
      webdriverConfig);
    let landingPage = await showLandingPage();
    let navMenu = landingPage.getNavMenu();
    await allure.createStep('activate nav item "Teams"', async() => {
      await navMenu.navToTeams();
    })();
    let teamList = navMenu.getTeamList();
    await allure.createStep(`check team "${TeamListItemEnum.properties[TeamListItemEnum.ABERDEEN].name}" exists`, async() => {
      let team = await teamList.getTeamListItemFor(TeamListItemEnum.ABERDEEN);
      allure.createAttachment('web element content', await getHtmlFrom(team));
      expect(team).to.exist;
    })();
    await allure.createStep(`check team "${TeamListItemEnum.properties[TeamListItemEnum.MOTHERWELL].name}" exists`, async() => {
      let team = await teamList.getTeamListItemFor(TeamListItemEnum.MOTHERWELL);
      allure.createAttachment('web element content', await getHtmlFrom(team));
      expect(team).to.exist;
    })();
    await allure.createStep(`check team "${TeamListItemEnum.properties[TeamListItemEnum.STJOHNSTONE].name}" exists`, async() => {
      let team = await teamList.getTeamListItemFor(TeamListItemEnum.STJOHNSTONE);
      allure.createAttachment('web element content', await getHtmlFrom(team));
      expect(team).to.exist;
    })();
    await takeScreenshot('team-list-screenshot');
  });
});
