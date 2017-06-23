/* eslint-env mocha */
'use strict';
import {
} from 'mocha';
import {
  chaiConfig,
  expect
} from './ChaiConfig';
import AllureHelper from './AllureHelper';

chaiConfig.setDefaults();

/* eslint-disable no-unused-expressions */
describe('AllureHelper', function () {
  describe('expect isEmpty', function () {
    it('can check for a null string', function () {
      expect(true).to.eql(AllureHelper.isEmpty(null));
    });
    it('can check for an undefined string', function () {
      expect(true).to.eql(AllureHelper.isEmpty(undefined));
    });
    it('can check for an empty string', function () {
      expect(true).to.eql(AllureHelper.isEmpty(''));
    });
    it('can check for a given string', function () {
      expect(false).to.eql(AllureHelper.isEmpty('given'));
    });
  });
  describe('expect isUndefined', function () {
    it('can check for a null object', function () {
      expect(true).to.eql(AllureHelper.isUndefined(null));
    });
    it('can check for an undefined string', function () {
      expect(true).to.eql(AllureHelper.isUndefined(undefined));
    });
    it('can check for a given Boolean of true', function () {
      expect(false).to.eql(AllureHelper.isUndefined(Boolean(true)));
    });
    it('can check for a given Boolean of false', function () {
      expect(false).to.eql(AllureHelper.isUndefined(Boolean(false)));
    });
  });
});
