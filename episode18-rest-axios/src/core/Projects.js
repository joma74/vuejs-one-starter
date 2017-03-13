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
        const $scope = this;
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

}

export default Projects;
