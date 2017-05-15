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

describe('Some Feature', function() {
  let devServer;
  let webpackConfig;
  let devServerConfig;
  before(function() {
    process.env.NODE_ENV = 'development';
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    webpackConfig = require(path.join(process.cwd(), './webpack.config.js'));
    devServerConfig = webpackConfig.devServer;
    devServer = startDevServer(webpackConfig);
    devServer.listen(devServerConfig.port);
  });
  after(function() {
    devServer && devServer.close();
  });
  it('is working', async function() {
    chai.config.truncateThreshold = 0; // to show content of actual and expected array
    chai.config.showDiff = true;
    let response = await doRequest('https://localhost:8080/');
    expect(response).to.not.equal(null);
    // console.log(response);
  });
});

function startDevServer(webpackConfig) {
  const compiler = webpack(webpackConfig);
  let devServerConfig = webpackConfig.devServer;
  // console.log(JSON.stringify(devServerConfig));
  devServerConfig['hot'] = true;
  devServerConfig['stats'] = {
    colors: true
  };
  devServerConfig['quiet'] = true; // like DONE compiled successfully ...
  devServerConfig['noInfo'] = true; // like Assets Chunks ...
  // devServerConfig['overlay'] = false; // no effect
  // console.log(JSON.stringify(devServerConfig));
  /* eslint-disable new-cap */
  return new webpackDevServer(compiler, devServerConfig);
}

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
