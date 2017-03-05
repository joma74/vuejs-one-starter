<template>
<div class="container content">
    <h1>My Project List</h1>
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
    <vue-toastr ref="toastr"></vue-toastr>
</div>
</template>

<script>
import Form from './core/Form';
import Projects from './core/Projects';
import Toastr from 'vue-toastr';
require('vue-toastr/src/vue-toastr.less');

import axios from 'axios';

const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);

export default {
    name: 'app',
    data() {
        return {
            projects: new Projects(this.$refs.toastr),
            form: new Form({
                name: '',
                description: ''
            })
        }
    },
    mounted() {
        this.projects.setToastr(this.$refs.toastr);
        this.form.setToastr(this.$refs.toastr);
        this.$refs.toastr.defaultTimeout = 5000;
        this.$refs.toastr.defaultPosition = "toast-bottom-full-width";
        axios.defaults.baseURL = 'http://localhost:9095/rest-spring-server';
        this.projects.updateProjectList('/api/projects');
    },
    components: {
        'vue-toastr': Toastr
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
