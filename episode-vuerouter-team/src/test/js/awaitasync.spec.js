/* eslint-env mocha */
'use strict';
import {
  describe,
  it
} from 'mocha';
import {
  chaiConfig,
  expect
} from './utils/ChaiConfig';

chaiConfig.setDefaults();

/* eslint-disable no-unused-expressions */
describe('An wait/async can be hidden inside an async iffe', function () {
  it('NOT if nothing awaits it', function () {
    let messages = [];
    let funcTimeout = function timeout(ms) {
      return new Promise((resolve) => {
        setTimeout(function(){
            messages.push(3);
            resolve(4);
        }, ms);
        messages.push(2);
      });
    };
    messages.push(1);
    (async() => {
      messages.push(await funcTimeout(500));
      messages.push(5);
    })();
    expect([1, 2]).to.eql(messages);
  });
  it('only iff awaited', async function () {
    let messages = [];
    let funcTimeout = function timeout(ms) {
      return new Promise((resolve) => {
        setTimeout(function(){
            messages.push(3);
            resolve(4);
        }, ms);
        messages.push(2);
      });
    };
    messages.push(1);
    await (async() => {
      messages.push(await funcTimeout(500));
      messages.push(5);
    })();
    expect([1, 2, 3, 4, 5]).to.eql(messages);
  });
});

