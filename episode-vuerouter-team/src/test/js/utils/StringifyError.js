const debug = require('debug')('vuerouter.team.test:.js.utils.stringifyerror');

function stringifyError(error, replacer, space) {
  var plainObject = {};
  Object.getOwnPropertyNames(error).forEach(function(key) {
    plainObject[key] = error[key];
  });
  plainObject['name'] = error.constructor.name;
  debug('%o', plainObject);
  return JSON.stringify(plainObject, replacer, space);
};


export default {
   stringifyError
};
