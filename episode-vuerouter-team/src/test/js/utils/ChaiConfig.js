import chai from 'chai';

class ChaiConfig{
  setDefaults() {
    chai.config.truncateThreshold = 0; // to show  content of actual and expected array
    chai.config.showDiff = true;
    chai.config.includeStack = true;
  }
}

export let chaiConfig = new ChaiConfig();
