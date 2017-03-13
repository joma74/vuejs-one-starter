import axios from 'axios';
import Vue from 'vue';

class Projects {

    constructor() {
        this.projectArray = [];
    }

    /**
     * [updateProjectList description]
     * @method updateProjectList
     * @param  {string} url to update from
     * @return {Promise} return the promise
     */
    updateProjectList(url) {
        let getProjects = function() {
            return axios.get(url, {
                    withCredentials: true
                })
                .catch((err) => {
                    console.error(err.stack || err);
                    let msg = err.message + (err.config ? ' for ' + err.config.method + ' on ' + err.config.url : '');
                    throw Error(msg);
                });
        };
        return getProjects();
    }

    putProject(url, payload) {
        let putProject = function() {
            return axios.put(url, payload, {
                    withCredentials: true
                })
                .catch((err) => {
                    if (err.response) {
                        throw err;
                    } else {
                        console.error(err.stack || err);
                        let msg = err.message + (err.config ? ' for ' + err.config.method + ' on ' + err.config.url : '');
                        throw Error(msg);
                    }
                });
        };
        return putProject();
    }
}

export default Projects;
