import {
  describe,
  it,
  before,
  after
} from 'mocha';

import {
  expect,
  default as chai
} from 'chai';

import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import path from 'path';
import request from 'request';
import remove from 'lodash/remove';

chai.config.truncateThreshold = 0; // to show content of actual and expected array
chai.config.showDiff = true;

describe('Some Feature', function () {
  let devServer;
  let webpackConfig;
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  before(function (done) {
    process.env.NODE_ENV = 'development';
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    webpackConfig = require(path.join(process.cwd(), './webpack.config.js'));
    disableNotifierPlugin(webpackConfig);
    disableFriendlyErrorsWebpackPlugin(webpackConfig);
    listPlugins(webpackConfig);
    devServer = startDevServer(webpackConfig, done);
    devServer.listen(webpackConfig.devServer.port);
  });
  after(function () {
    devServer && devServer.close();
  });
  it('is working', async function () {
    let response = await doRequest(`https://${webpackConfig.devServer.host || 'localhost'}:${webpackConfig.devServer.port}/`);
    expect(response).to.not.equal(null);
  });
});

function disableNotifierPlugin(webpackConfig) {
  remove(webpackConfig.plugins, function (entry) {
    try {
      return entry.options.alwaysNotify;
    } catch (error){
      return false;
    }
  });
};

function disableFriendlyErrorsWebpackPlugin(webpackConfig) {
  remove(webpackConfig.plugins, function (entry) {
    try {
      return entry.constructor && entry.constructor.name === 'FriendlyErrorsWebpackPlugin';
    } catch (error){
      return false;
    }
  });
};

function listPlugins(webpackConfig) {
  webpackConfig.plugins.forEach(function (entry) {
    // console.log(entry);
  });
};

function startDevServer(webpackConfig, done) {
  const compiler = webpack(webpackConfig, onComplete);
  let devServerConfig = webpackConfig.devServer;
  // console.log(JSON.stringify(devServerConfig));
  devServerConfig['hot'] = true;
  // devServerConfig['stats'] = 'errors-only';
  devServerConfig['quiet'] = true; // like DONE compiled successfully ...
  devServerConfig['noInfo'] = true; // like Assets, Chunks ...
  // devServerConfig['overlay'] = false; // no effect
  // console.log(JSON.stringify(devServerConfig));
  function onComplete(error, stats) {
    let statsConfig = {
      colors: false,
      reasons: false,
      errors: true,
      errorDetails: false,
      version: false,
      performance: false,
      timings: false,
      assets: false,
      chunks: false,
      hash: false
    };
    if (error) { // fatal error
      done(error);
    } else if (stats.hasErrors()) { // soft error
      let errorMessage = stats.toString(statsConfig);
      done(new Error(errorMessage));
    } else {
      let message = stats.toString(statsConfig);
      done(message);
    }
  }
  /* eslint-disable new-cap */
  return new webpackDevServer(compiler, devServerConfig);
}



function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, {
        rejectUnauthorized: false,
        requestCert: true
      },
      function (error, res, body) {
        if (!error && res.statusCode === 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
  });
}
