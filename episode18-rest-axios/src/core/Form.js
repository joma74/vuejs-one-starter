import axios from 'axios';
import Errors from './Errors';

class Form {

    constructor(data) {
        this.originalData = data;

        for (let field in this.originalData) {
            this[field] = this.originalData[field];
        }

        this.fieldErrors = new Errors();
    }

    reset() {
        for (let field in this.originalData) {
            this[field] = null;
        }
    }

    _payload() {
        let payload = Object.assign({}, this);
        delete payload.originalData;
        delete payload.fieldErrors;
        return payload;
    }

    /**
     * Submit the project to the given url.
     * @method submit
     * @param  {string} url to submit to
     * @return {Promise} return the promise
     */
    submit(url) {
        const $scope = this;
        let putProject = function() {
            return axios.put(url, $scope._payload(), {
                    withCredentials: true
                })
                .catch((err) => {
                    throw err;
                });
        };
        let resetForm = function() {
            $scope.reset();
        };

        return putProject()
            .then(resetForm)
            .catch((err) => {
                if (err.response) {
                    console.error(err.response);
                    $scope.fieldErrors.record(err.response.data.fieldErrors);
                } else {
                    console.error(err.stack || err);
                }
            });
    }
}

export default Form;
