import remove from 'lodash/remove';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import Deferred from './Deferred';
import stringifyError from './StringifyError';

const debug = require('debug')('vuerouter.team.test:.js.utils.webpackserversetup');

export const HOSTNAME_DEFAULT = 'localhost';

export default class WebpackServerSetup {
  constructor(webpackConfig, doDisableVerbosePlugins) {
    this.webpackConfig = webpackConfig;
    if (doDisableVerbosePlugins === true){
      this.disableVerbosePlugins();
    }
    this.devServerConfig = this.webpackConfig.devServer;
    this._configureDevServer();
    this.webpackDevServer = null;
  }
  disableVerbosePlugins() {
    this.disableNotifierPlugin();
    this.disableFriendlyErrorsWebpackPlugin();
    this.listPlugins();
  }
  disableNotifierPlugin() {
    remove(this.webpackConfig.plugins, function (entry) {
      try {
        return entry.options.alwaysNotify; // has no constructor
      } catch (error) {
        return false;
      }
    });
  };
  disableFriendlyErrorsWebpackPlugin() {
    const PLUGIN_CONSTRUCTOR_NAME = 'FriendlyErrorsWebpackPlugin';
    remove(this.webpackConfig.plugins, function (entry) {
      try {
        return entry.constructor && entry.constructor.name === PLUGIN_CONSTRUCTOR_NAME;
      } catch (error) {
        return false;
      }
    });
  };
  listPlugins() {
    debug('--- listing configured webpack plugins ---');
    this.webpackConfig.plugins.forEach(function (entry) {
      debug('%o', entry);
    });
  };
  async start() {
    debug('--- starting ---');
    const deferred = new Deferred();
    const dPromise = deferred.promise;

    let [compiler] = await Promise.all([
      webpack(this.webpackConfig, function onComplete(error, stats) {
        let statsConfig = {
          colors: false,
          reasons: false,
          errors: true,
          errorDetails: true,
          version: false,
          performance: false,
          timings: false,
          assets: false,
          chunks: false,
          hash: false
        };
        if (error) { // fatal error
          debug('webpack compiler gave fatal error %o', stringifyError(error));
          deferred.reject(error);
        } else if (stats.hasErrors()) { // soft error
          let errorMessage = stats.toString(statsConfig);
          debug('webpack compiler gave soft error %s', errorMessage);
          deferred.reject(new Error(errorMessage));
        } else {
          let message = stats.toString(statsConfig);
          deferred.resolve(message);
        }
      }),
      dPromise
    ]);
    debug('dev server config is %o', this.devServerConfig);
    /* eslint-disable new-cap */
    this.webpackDevServer = new webpackDevServer(compiler, this.devServerConfig);
    this.webpackDevServer.listen(this.devServerConfig['port']);
    return this;
  }
  /**
   * This method has to redo all that is evaluated via CLI node_modules/.bin/webpack-dev-server
   * @method _configureDevServer
   * @return {object}            config for the devServer
   */
  _configureDevServer() {
    // console.log('Base configured devServer config >>' + JSON.stringify(devServerConfig));
    // this section has to redo all that is evaluated via CLI node_modules/.bin/webpack-dev-server
    this.devServerConfig['hot'] = false;
    this.devServerConfig['hotOnly'] = false;
    this.devServerConfig['clientLogLevel'] = 'warning';
    this.devServerConfig['stats'] = 'errors-only';
    this.devServerConfig['quiet'] = true; // like DONE compiled successfully ...
    this.devServerConfig['noInfo'] = true; // like Assets, Chunks ...
    this.devServerConfig['contentBase'] = this.webpackConfig.output.path;
    this.devServerConfig['host'] = HOSTNAME_DEFAULT;
    this.devServerConfig['publicPath'] = this._configureBaseUrl();
    this.devServerConfig['filename'] = this.webpackConfig.output.filename;
    // devServerConfig['overlay'] = false; // no effect
    // console.log('Final configured devServer config >>' + JSON.stringify(this.devServerConfig));
  };
  _configureBaseUrl(){
    debug('--- configuring base url ---');
    let protocolPart = (this.devServerConfig['https'] === true ? 'https' : 'http');
    let baseURL = `${protocolPart}://${this.webpackConfig.devServer.host || HOSTNAME_DEFAULT}:${this.webpackConfig.devServer.port}/`;
    debug('baseURL is configured to >>%s<<', baseURL);
    return baseURL;
  }
  getBaseUrl(){
    return this.devServerConfig['publicPath'];
  }
  stop() {
    debug('--- stopping ---');
    this.webpackDevServer && this.webpackDevServer.close();
  }
}
