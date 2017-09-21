const debug = require('debug')('vuerouter.team.test:js.utils.stringifyerror');

/**
 * Stringifies an Error
 * @param {Error} error the error to be stringified
 * @param {(string | number)[]} [replacer] A function that transforms the results
 * @param {string | number} [space] Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read
 * @returns {string} the stringified error
 */
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
