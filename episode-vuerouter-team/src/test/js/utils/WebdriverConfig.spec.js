/* eslint-env mocha */
'use strict';
/* global allure */
import {
  chaiConfig,
  expect
} from './ChaiConfig';
import WebdriverConfig from './WebdriverConfig';

chaiConfig.setDefaults();

/* eslint-disable no-unused-expressions */
describe('WebdriverConfig', function() {
  describe('function _getExecutionErrorFrom', function() {
    it('can convert an error back as object', function() {
      allure.description('Converting an error toJson is not ECMA specified and ' +
      ' hence defaults to an empty object. Alternative toString is not parseable. ' +
      ' Essentially this test shows the transformation of an error to json. ' +
      'See https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify.');
      const message = JSON.stringify({
        aProp: 'anEasyValue'
      });
      const name = 'Error';
      let error = new Error(message);
      let errorAsJsonString = WebdriverConfig._getExecutionErrorFrom(error);
      allure.createAttachment('errorAsJsonString.json', errorAsJsonString);
      let errorAsObject = JSON.parse(errorAsJsonString)['execution_error'];
      expect(errorAsObject).to.have.ownProperty('stack');
      expect(errorAsObject.stack).to.not.be.empty;
      expect(errorAsObject.stack).to.contains('at Runner.runTest');
      delete errorAsObject.stack;
      expect(errorAsObject).to.eql({
        message,
        name
      });
    });
  });
});
