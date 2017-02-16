<template>
<div class="container content">
    <h1>My Projects</h1>
    <ul>
        <li v-for="project in projects" v-text="project.name"></li>
    </ul>
    <form method="post" action="/projects" @submit.prevent="onSubmit">
        <label for="name" class="label">Project Name:</label>
        <p class="control has-icon has-icon-right">
            <input type="text" id="name" name="name" class="input is-danger" v-model="name" placeholder="Insert Your Project Name Here...">
            <span class="help is-danger">This name is invalid</span>
        </p>
        <label for="description" class="label">Project Description:</label>
        <p class="control has-icon has-icon-right">
            <input type="text" id="description" name="description" class="input is-danger" v-model="description" placeholder="Insert Your Project Description Here...">
            <span class="help is-danger">This description is invalid</span>
        </p>
        <p class="control">
            <button class="button is-primary">Create</button>
        </p>
    </form>
</div>
</template>

<script>
import axios from 'axios';
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);

export default {
    name: 'app',
    data() {
        return {
            name: '',
            description: '',
            projects: [],
            fieldErrors: {}
        }
    },
    mounted() {
        axios.defaults.baseURL = 'http://localhost:9095/rest-spring-server';
        axios.get('/api/projects', {
                withCredentials: true
            }).then(response => {
                this.projects = response.data.projects;
            })
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
                $scope.projects = response.data.projects;
            };

            putProject()
                .then(getProjects)
                .then(updateProjectList)
                .catch((err) => {
                    if (err.response) {
                        console.error(err.response);
                        $scope.fieldErrors = err.response.data.fieldErrors;
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
