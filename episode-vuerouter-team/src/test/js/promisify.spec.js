import {
  describe,
  it
} from 'mocha';

import {
  expect,
  default as chai
} from 'chai';

import Deferred from './Deferred';

chai.config.truncateThreshold = 0; // to show content of actual and expected array
chai.config.showDiff = true;

describe('Promisify', function () {
  it('a sync returning function with a callback/badimpl', async function () {
    let theValue = 0;
    // callback.bind(null, theValue);
    let results = await Promise.all([
      doSth(callback),
      callback()
    ]);
    expect(results).to.deep.equal([2, 2]);
    expect(theValue).to.equal(2);

    function doSth(callback) {
      callback();
      return 2;
    }

    function callback() {
      return new Promise(resolve => { // fires immediately
        theValue = theValue + 1;
        // console.trace('Added up to ' + theValue);
        setTimeout(resolve, 15, theValue);
      });
    };
  });

  it('a sync returning function with a callback/resolved', async function () {
    var deferred = new Deferred();
    var dPromise = deferred.promise;

    let results = await Promise.all([
      doSth(callback),
      dPromise
    ]);

    function doSth(callback) {
      callback();
      return 2;
    }

    function callback() {
      // console.trace('Called');
      deferred.resolve(1);
    };

    expect(results).to.deep.equal([2, 1]);
  });

  it('a sync returning function with a callback/rejected', async function () {
    var deferred = new Deferred();
    var dPromise = deferred.promise;

    await Promise.all([
        doSth(callback),
        dPromise
      ])
      .then((res) => {
        throw new Error('Should have thrown an error/value on rejection.');
      })
      .catch((err) => {
        expect(err).to.equal(1);
      });

    function doSth(callback) {
      callback();
      return 2;
    }

    function callback() {
      // console.trace('Called');
      deferred.reject(1);
    }
  });

  it('a sync function with a callback/error', async function () {
    var deferred = new Deferred();
    var dPromise = deferred.promise;

    const EXPECTED_ERROR_MSG = 'Expect to be thrown';
    const UNEXPECTED_ERROR_MSG = 'Should have thrown an error/value on callback.';

    let errMsg = '_PRETEST_';

    try {
      expect(await Promise.all([
        doSth(callback),
        dPromise
      ])
        .then((res) => {
          throw new Error(UNEXPECTED_ERROR_MSG);
        })
        /* eslint-disable handle-callback-err */
        .catch((err) => {
          throw new Error(UNEXPECTED_ERROR_MSG);
        })
      );
    } catch (err) {
      errMsg = err.message;
    }

    expect(errMsg).to.equal(EXPECTED_ERROR_MSG);

    function doSth(callback) {
      callback();
      return 2;
    }

    function callback() {
      // console.trace('Called');
      throw new Error(EXPECTED_ERROR_MSG);
    }
  });
});
