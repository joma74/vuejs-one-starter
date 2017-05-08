import {
  DI_HTTP_SERVICE
} from '../config/AppConstants';
import {
  default as bm
} from 'vue-inject';

/**
 * Rethrow a new error with a new msg. If the given err
 * contains a config property(from axios) a special message is
 * built: {err.message} for {err.config.method} on {err.config.url}
 * e.g. Network Error for get on http://localhost:9095/rest-spring-server/api/projects
 * @method _rethrowWithMsgFrom
 * @param  {Error} err the error
 * @throws a new error with a msg
 */
function _rethrowWithMsgFrom (err) {
  if (err.response) {
    throw err;
  } else {
    console.error(err.stack || err);
    let msg = err.message + (err.config ? ' for ' + err.config.method + ' on ' + err.config.url : '');
    throw Error(msg);
  }
}

/**
 * Get a list of all teams. If a http error occurs, this error
 * is rethrown as is. If a network error occurs, a new error with
 * a special message is returned.
 * @method getTeams
 * @param  {string} url to get projects from
 * @throws with err.msg
 * @return {Promise} return the executing promise
 */
function fetchTeams (url) {
  let fetchTeams = function (rethrowWithMsgFrom) {
    return bm.get(DI_HTTP_SERVICE).get(url)
      .catch((err) => {
        rethrowWithMsgFrom(err);
      });
  };
  return fetchTeams(_rethrowWithMsgFrom);
}

export {
  fetchTeams
};
