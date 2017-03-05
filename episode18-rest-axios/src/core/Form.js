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

    setToastr(toastr) {
        this.toastr = toastr;
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
        delete payload.toastr;
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
                    $scope.toastr.Add({
                        msg: err.message + (err.config ? ' for ' + err.config.method + ' on ' + err.config.url: ''),
                        type: "error"
                    });
                    throw err;
                }
            });
    }
}

export default Form;
