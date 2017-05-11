import {
  describe,
  it
} from 'mocha';

import {
  expect,
  default as chai
} from 'chai';

describe('Some Feature', function () {
  it('is working', function () {
    chai.config.truncateThreshold = 0; // to show content of actual and expected array
    chai.config.showDiff = true;
    expect(1).to.equal(1);
  });
});
