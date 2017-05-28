let mochaMultiReportersConfig = {
  'reporterEnabled': 'mocha-allure-reporter,spec',
  'mochaAllureReporterReporterOptions': {
      'targetDir': process.env.npm_package_config_allure_results_base
  }
};
module.exports = mochaMultiReportersConfig;
