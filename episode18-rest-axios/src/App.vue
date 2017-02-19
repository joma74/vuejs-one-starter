<template>
<div class="container content">
    <h1>My Projects</h1>
    <ul>
        <li v-for="project in projects.projectArray" v-text="project.name"></li>
    </ul>
    <hr>
    <form method="post" action="/projects" @submit.prevent="onSubmit" @keydown="form.fieldErrors.clear($event.target.name)" autocomplete="off">
        <p class="control">
            <label for="name" class="label">Project Name:</label>
            <input type="text" id="name" name="name" class="input" v-model="form.name" placeholder="Insert Your Project Name Here...">
            <span class="help is-danger" v-if="form.fieldErrors.has('name')" v-text="form.fieldErrors.get('name')">This name is invalid</span>
        </p>
        <p class="control">
            <label for="description" class="label">Project Description:</label>
            <input type="text" id="description" name="description" class="input" v-model="form.description" placeholder="Insert Your Project Description Here...">
            <span class="help is-danger" v-if="form.fieldErrors.has('description')" v-text="form.fieldErrors.get('description')">This description is invalid</span>
        </p>
        <p class="control">
            <button class="button is-primary" :disabled="form.fieldErrors.any()">Create</button>
        </p>
    </form>
</div>
</template>

<script>
import axios from 'axios';
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');

class Errors {

    constructor() {
        this.fieldErrorsArray = [];
    }

    /**
     *
     */
    /**
     * Convert multi-objects at 1-st level into an array of objects
     * @method _objectsToArray
     * @param  {Object} objs the multi-objects to be converted
     * @return {array} an array of objects
     */
    _objectsToArray(objs) {
        return Object.keys(objs).map(function(key) {
            return objs[key];
        });
    }

    /**
     * Returns the first fieldError with the same
     * field value as the parameter.
     * @method _findBy
     * @param {string} byFieldName The name of the field to filter errors for.
     */
    _findBy(byFieldName) {
        let filtered = this.fieldErrorsArray.filter(function(fieldError) {
            if (fieldError.field == byFieldName) {
                return true;
            }
            return false;
        });
        return filtered[0];
    }

    /**
     * Deletes the first fieldErrors with the same
     * field value as the parameter.
     * @method _deleteBy
     * @param {string} byFieldName The name of the field to filter errors for.
     */
    _deleteBy(byFieldName) {
        let foundIndex = this.fieldErrorsArray.findIndex(function(fieldError) {
            if (fieldError.field == byFieldName) {
                return true;
            }
            return false;
        });
        if (foundIndex >= 0) {
            // remove an element at index foundIndex
            this.fieldErrorsArray.splice(foundIndex, 1);
        }
    }

    /**
     * Constructs an error message from the given field error for displayment
     * @method _constructErrorMessage
     * @param  {Object} fieldError the fieldError as returned by the serevr
     * @return {string} the error message for displayment
     */
    _constructErrorMessage(fieldError) {
        if (fieldError) {
            return "Das Feld " + fieldError.error;
        }
    }

    /**
     * Get the error message for displayment by the given fieldName
     * @method get
     * @param  {string} fieldName the name of the field
     * @return {string} the error message for displayment
     */
    get(fieldName) {
        let fieldError = this._findBy(fieldName);
        return this._constructErrorMessage(fieldError);
    }

    /**
     * Clear the fieldError for the given fieldName, if any
     * @method clear
     * @param  {string} fieldName to clear, if any
     */
    clear(fieldName) {
        this._deleteBy(fieldName);
    }

    /**
     * Record a multi-object of fieldErrors
     * <pre>
     * {
     *  "fieldErrors": [
     *   {
     *      "field": "name",
     *      "error": "darf nicht leer sein"
     *    },
     *    {
     *      "field": "description",
     *      "error": "darf nicht leer sein"
     *    }
     *  ]
     *}
     * </pre>
     * @method record
     * @param  {Object[]} fieldErrors
     * @return {[type]}             [description]
     */
    record(fieldErrors) {
        this.fieldErrorsArray = this._objectsToArray(fieldErrors);
    }

    has(fieldName) {
        return this.get(fieldName);
    }

    any() {
        return this.fieldErrorsArray.length > 0;
    }
}

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
            });
    }

}

axiosCookieJarSupport(axios);

export default {
    name: 'app',
    data() {
        return {
            projects: new Projects(),
            form: new Form({
                name: '',
                description: ''
            })
        }
    },
    mounted() {
        axios.defaults.baseURL = 'http://localhost:9095/rest-spring-server';
        this.projects.updateProjectList('/api/projects');
    },
    methods: {
        onSubmit() {
            let $scope = this;
            let updateProjectList = function() {
                $scope.projects.updateProjectList('/api/projects');
            };

            this.form.submit('/api/projects')
                .then(updateProjectList);

        }
    }
}
</script>

<style>

</style>
