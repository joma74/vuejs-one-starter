<template>
<div class="container content">
    <h1>My Projects</h1>
    <ul>
        <li v-for="project in projectList" v-text="project.name"></li>
    </ul>
    <form method="post" action="/projects" @submit.prevent="onSubmit" @keydown="fieldErrors.clear($event.target.name)">
        <p class="control">
            <label for="name" class="label">Project Name:</label>
            <input type="text" id="name" name="name" class="input" v-model="name" placeholder="Insert Your Project Name Here...">
            <span class="help is-danger" v-if="fieldErrors.has('name')" v-text="fieldErrors.get('name')">This name is invalid</span>
        </p>
        <p class="control">
            <label for="description" class="label">Project Description:</label>
            <input type="text" id="description" name="description" class="input" v-model="description" placeholder="Insert Your Project Description Here...">
            <span class="help is-danger" v-if="fieldErrors.has('description')" v-text="fieldErrors.get('description')" @keydown="fieldErrors.clear('description')">This description is invalid</span>
        </p>
        <p class="control">
            <button class="button is-primary" :disabled="fieldErrors.any()">Create</button>
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
     * Convert objects at 1-st level into an array of objects
     */
    _objectsToArray(obj) {
        return Object.keys(obj).map(function(key) {
            return obj[key];
        });
    }

    /*
     * Returns the first fieldError with the same field value as the parameter.
     *
     * @param {string} byFieldName - The name of the field to filter errors for.
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

    /*
     * Deletes the first fieldErrors with the same field value as the parameter.
     *
     * @param {string} byFieldName - The name of the field to filter errors for.
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

    _constructErrorMessage(fieldError){
      if (fieldError) {
          return "Das Feld " + fieldError.error;
      }
    }

    get(fieldName) {
        let fieldError = this._findBy(fieldName);
        return this._constructErrorMessage(fieldError);
    }

    clear(fieldName) {
        this._deleteBy(fieldName);
    }

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

axiosCookieJarSupport(axios);

export default {
    name: 'app',
    data() {
        return {
            name: '',
            description: '',
            projectList: [],
            fieldErrors: new Errors()
        }
    },
    mounted() {
        axios.defaults.baseURL = 'http://localhost:9095/rest-spring-server';
        var $scope = this;
        var getProjects = function() {
            return axios.get('/api/projects', {
                    withCredentials: true
                })
                .catch((err) => {
                    throw err;
                });
        };
        var updateProjectList = function(response) {
            $scope.projectList = response.data.projects;
        };

        getProjects()
            .then(updateProjectList)
            .catch((err) => {
                console.error(err.stack || err);
            });
    },
    methods: {
        onSubmit() {
            var $scope = this;
            var putProject = function() {
                return axios.put('/api/projects', {
                        name: $scope.name,
                        description: $scope.description
                    }, {
                        withCredentials: true
                    })
                    .catch((err) => {
                        throw err;
                    });
            };
            var getProjects = function() {
                return axios.get('/api/projects', {
                        withCredentials: true
                    })
                    .catch((err) => {
                        throw err;
                    });
            };
            var updateProjectList = function(response) {
                $scope.projectList = response.data.projects;
            };

            putProject()
                .then(getProjects)
                .then(updateProjectList)
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
}
</script>

<style>

</style>
