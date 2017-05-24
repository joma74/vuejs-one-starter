import remove from 'lodash/remove';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import Deferred from './Deferred';

export default class WebpackServerSetup {
  constructor(webpackConfig) {
    this.webpackConfig = webpackConfig;
    this.webpackDevServer = null;
  }
  disableVerbosePlugins() {
    this.disableNotifierPlugin();
    this.disableFriendlyErrorsWebpackPlugin();
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
    this.webpackConfig.plugins.forEach(function (entry) {
      // console.log(entry);
    });
  };
  async start() {
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
          deferred.reject(error);
        } else if (stats.hasErrors()) { // soft error
          let errorMessage = stats.toString(statsConfig);
          deferred.reject(new Error(errorMessage));
        } else {
          let message = stats.toString(statsConfig);
          deferred.resolve(message);
        }
      }),
      dPromise
    ]);
    let devServerConfig = this._configureDevServer();
    /* eslint-disable new-cap */
    this.webpackDevServer = new webpackDevServer(compiler, devServerConfig);
    this.webpackDevServer.listen(this.webpackConfig.devServer.port);
  }
  /**
   * This method has to redo all that is evaluated via CLI node_modules/.bin/webpack-dev-server
   * @method _configureDevServer
   * @return {object}            config for the devServer
   */
  _configureDevServer() {
    let devServerConfig = this.webpackConfig.devServer;
    console.log('Base configured devServer config >>' + JSON.stringify(devServerConfig));
    // this section has to redo all that is evaluated via CLI node_modules/.bin/webpack-dev-server
    devServerConfig['hot'] = false;
    devServerConfig['hotOnly'] = false;
    devServerConfig['clientLogLevel'] = 'warning';
    devServerConfig['stats'] = 'errors-only';
    devServerConfig['quiet'] = true; // like DONE compiled successfully ...
    devServerConfig['noInfo'] = true; // like Assets, Chunks ...
    devServerConfig['contentBase'] = this.webpackConfig.output.path;
    devServerConfig['host'] = 'localhost';
    devServerConfig['publicPath'] = 'https://localhost:8080/';
    devServerConfig['filename'] = this.webpackConfig.output.filename;
    // devServerConfig['overlay'] = false; // no effect
    console.log('Final configured devServer config >>' + JSON.stringify(devServerConfig));
    return devServerConfig;
  };
  stop() {
    this.webpackDevServer && this.webpackDevServer.close();
  }
}
