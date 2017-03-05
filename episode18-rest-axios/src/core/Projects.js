import axios from 'axios';
import Toastr from 'vue-toastr';

class Projects {

    constructor() {
        this.projectArray = [];

    }

    setToastr(toastr) {
        this.toastr = toastr;
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
            return axios.get('/api/projects', {
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
            .then((response) => updateProjectList(response))
            .catch((err) => {
                console.error(err.stack || err);
                $scope.toastr.Add({
                    msg: err.message + (err.config ? ' for ' + err.config.method + ' on ' + err.config.url: ''),
                    type: "error"
                });

            });
    }

}

export default Projects;
