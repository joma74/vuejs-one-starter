import {
  describe,
  it
} from 'mocha';

import {
  expect,
  default as chai
} from 'chai';

chai.config.truncateThreshold = 0; // to show content of actual and expected array
chai.config.showDiff = true;

describe('Some Feature', function () {
  it('is working', async function () {
      let result = doSth(callback);
      expect(result).to.equal(2);
  });

  function doSth(callback){
    callback();
    return 2;
  }

  function callback(){
    return 1;
  }
});
