const debug = require('debug')('vuerouter.team.test:js.utils.loadpackagejsonconfig');
const UseConfig = require('use-config');

export default class LoadPackageJsonConfig {
  constructor() {
    this.useConfig = new UseConfig({
      name: 'config'
    });
  }
  async adoptEnvironmentVariables(){
    let packageJson = await this.useConfig.load();
    debug('loaded config section of package.json >>');
    debug('%O', packageJson);
    debug('<<');
    debug('Starting to export those as npm environment variables');
    for (let [key, value] of Object.entries(packageJson.config)) {
      process.env[`npm_package_config_${key}`] = value;
    }
  }
};
