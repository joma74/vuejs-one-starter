function stringifyError(error, replacer, space) {
  var plainObject = {};
  Object.getOwnPropertyNames(error).forEach(function(key) {
    plainObject[key] = error[key];
  });
  plainObject['name'] = error.constructor.name;
  return JSON.stringify(plainObject, replacer, space);
};


export default {
   stringifyError
};
