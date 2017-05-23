import {
  describe,
  it,
  before,
  after
} from 'mocha';
import {
  expect
} from 'chai';
import {
  chaiConfig
} from './utils/ChaiConfig';
import path from 'path';
import request from 'request';
import WebpackServerSetup from './utils/WebpackServerSetup';

chaiConfig.setDefaults();

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const WDpromise = webdriver.until;

WDpromise.USE_PROMISE_MANAGER = false;

describe('Some Feature', function() {
  let driver;
  let webpackServerSetup;
  let webpackConfig;
  before(async function() {
    // process.env.NODE_ENV = 'development';
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    webpackConfig = require(path.join(process.cwd(), './webpack.config.js'));
    webpackServerSetup = new WebpackServerSetup(webpackConfig);
    webpackServerSetup.disableVerbosePlugins();
    await webpackServerSetup.start();
    driver = await new webdriver.Builder()
        .forBrowser('firefox')
        .build();
  });
  after(async function() {
    await driver.quit();
    await webpackServerSetup.stop();
  });
  it('is working', async function() {
    let BROWSER_URL = `https://${webpackConfig.devServer.host || 'localhost'}:${webpackConfig.devServer.port}/`;
    await driver.get(BROWSER_URL);

    await driver.wait(until.titleIs('vue-routing-team'), 1000);
    // let response = await doRequest(`https://${webpackConfig.devServer.host || 'localhost'}:${webpackConfig.devServer.port}/`);
    // expect(response).to.not.equal(null);
  });
});

function doRequest(url) {
  return new Promise(function(resolve, reject) {
    request(url, {
        rejectUnauthorized: false,
        requestCert: true
      },
      function(error, res, body) {
        if (!error && res.statusCode === 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
  });
}
