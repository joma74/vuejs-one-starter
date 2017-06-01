import {
  describe,
  it
} from 'mocha';
import {
  expect
} from 'chai';
import {
  chaiConfig
} from './utils/ChaiConfig';
import WebdriverConfig from './utils/WebdriverConfig';

chaiConfig.setDefaults();

describe('WebdriverConfig._getExecutionErrorFrom', function () {
  it('can convert an error', function () {
    let error = new Error('{ "aProp": "anEasyValue"}');
    let jsonString = WebdriverConfig._getExecutionErrorFrom(error);
      console.error(jsonString);
    let innerError = JSON.parse(jsonString)['execution_error'];

    expect({
      Error: {
        "aProp": "anEasyValue"
      }
    }).to.eql(JSON.parse(innerError));
  });
});
