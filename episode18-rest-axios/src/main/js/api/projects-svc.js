import {
    DI_HTTP_SERVICE
} from '../core/AppConstantNames'
import {
    default as bm
} from 'vue-inject'

/**
 * Rethrow a new error with a new msg. If the given err
 * contains a config property(from axios) a special message is
 * built: {err.message} for {err.config.method} on {err.config.url}
 * e.g. Network Error for get on http://localhost:9095/rest-spring-server/api/projects
 * @method _rethrowWithMsgFrom
 * @param  {Error} err the error
 * @throws a new error with a msg
 */
function _rethrowWithMsgFrom(err) {
    if (err.response) {
        throw err;
    } else {
        console.error(err.stack || err);
        let msg = err.message + (err.config ? ' for ' + err.config.method + ' on ' + err.config.url : '');
        throw Error(msg);
    }
}

/**
 * Get a list of all projects. If a http error occurs, this error
 * is rethrown as is. If a network error occurs, an new error with
 * a special message is returned.
 * @method getProjects
 * @param  {string} url to get projects from
 * @throws with err.msg
 * @return {Promise} return the executing promise
 */
function getProjects(url) {
    let getProjects = function(rethrowWithMsgFrom) {
        return bm.get(DI_HTTP_SERVICE).get(url, {
                withCredentials: true
            })
            .catch((err) => {
                rethrowWithMsgFrom(err);
            });
    };
    return getProjects(_rethrowWithMsgFrom);
}

/**
 * Put a new project to the list. If a http error occurs, this error
 * is rethrown as is. If a network error occurs, an new error with
 * a special message is returned.
 * @method putProject
 * @param  {string} url to put the new project to
 * @param  {Object} newProject the new project
 * @param  {string} newProject.name the name of the new project
 * @param  {string} newProject.description the description of the new project
 * @throws with err.response or with err.msg
 * @return {Promise} return the executing promise
 */
function putProject(url, newProject) {
    let putProject = function(rethrowWithMsgFrom) {
        return bm.get(DI_HTTP_SERVICE).put(url, newProject, {
                withCredentials: true
            })
            .catch((err) => {
                rethrowWithMsgFrom(err);
            });
    };
    return putProject(_rethrowWithMsgFrom);
}

function deleteProject(url) {
    let deleteProject = function(rethrowWithMsgFrom) {
        return bm.get(DI_HTTP_SERVICE).delete(url, {
                withCredentials: true
            })
            .catch((err) => {
                rethrowWithMsgFrom(err);
            });
    };
    return deleteProject(_rethrowWithMsgFrom);
}


export {
    getProjects,
    putProject,
    deleteProject
}
