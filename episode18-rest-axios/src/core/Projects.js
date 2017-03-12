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
                    throw err;
                });
        };
        let updateProjectList = function(response) {
            $scope.projectArray = response.data.projects;
        };

        return getProjects()
            //.then((response) => updateProjectList(response))
            .catch((err) => {
                console.error(err.stack || err);
                let msg = err.message + (err.config ? ' for ' + err.config.method + ' on ' + err.config.url : '');
                throw new Error(msg);
            });
    }

}

export default Projects;
