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

describe('Promisify', function () {
  it('a sync function with a callback', async function () {
    let theValue = 0;
    // callback.bind(null, theValue);
    let results = await Promise.all([
      doSth(callback), callback()
    ]);
    expect(results).to.deep.equal([2, 2]);
    expect(theValue).to.equal(2);

    function doSth(callback) {
      callback();
      return 2;
    }

    function callback() {
      return new Promise(resolve => {
        theValue = theValue + 1;
        console.log('Added up to ' + theValue);
        setTimeout(resolve, 300, theValue);
      });
    };
  });
});
