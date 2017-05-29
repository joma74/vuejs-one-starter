let mochaMultiReportersConfig = {
  'reporterEnabled': 'spec,mocha-allure-reporter',
  'mochaAllureReporterReporterOptions': {
      'targetDir': process.env.npm_package_config_allure_results_base
  }
};
module.exports = mochaMultiReportersConfig;
