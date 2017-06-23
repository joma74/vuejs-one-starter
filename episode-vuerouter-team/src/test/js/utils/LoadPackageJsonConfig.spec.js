/* eslint-env mocha */
'use strict';
import {
  chaiConfig,
  expect
} from './ChaiConfig';

const debug = require('debug')('vuerouter.team:test.js.loadpackagejson.spec');

chaiConfig.setDefaults();

/* eslint-disable no-unused-expressions */
describe('LoadPackageJson', function () {
  it('can be loaded', async function () {
    const UseConfig = require('use-config');
    const useConfig = new UseConfig({name: 'config'});
    let packageJson = await useConfig.load();
    debug(packageJson);
    for (let [key, value] of Object.entries(packageJson.config)) {
      expect(key).to.be.not.null;
      expect(value).to.be.not.null;
    }
  });
});
