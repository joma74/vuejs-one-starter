<template>
<div class="container content">
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
    <h1>
      <span class="title is-2" style="vertical-align:middle">My Projects</span>
      <a class="icon is-medium" style="vertical-align:middle"><i class="fa fa-refresh"></i></a>
    </h1>
    <div class="columns is-multiline">
        <projectcard-component v-for="(project, index, key) in projects.projectArray" v-bind:project="project" v-bind:index="index" v-bind:key="project.key" v-on:doDelete="doDelete(project.key, index)"></projectcard-component>
    </div>
    <vue-toastr ref="toastr"></vue-toastr>
</div>
</template>

<script>
import Vue from 'vue';
import Form from './core/Form';
import Toastr from 'vue-toastr';
import ProjectCard from './ProjectCard.vue';
require('vue-toastr/src/vue-toastr.less');

import axios from 'axios';

const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);

import {
    doUpdateProjectList,
    doPutProject,
    doDeleteProject
} from './ActionTypes'

export default {
    name: 'app',
    computed: {
        projects: function() {
            return this.$store.getters.projects;
        }
    },
    data() {
        return {
            form: new Form({
                name: '',
                description: ''
            })
        }
    },
    created: function() {
        this.$eventHub.$on('on-failure', this.toastrAddError)
    },
    beforeDestroy: function() {
        this.$eventHub.$off('on-failure', this.toastrAddError)
    },
    mounted() {
        this.$refs.toastr.defaultTimeout = 5000;
        this.$refs.toastr.defaultPosition = "toast-bottom-full-width";
        axios.defaults.baseURL = 'http://localhost:9095/rest-spring-server';
        doUpdateProjectList(this.$store, this.$eventHub);
    },
    components: {
        'vue-toastr': Toastr,
        'projectcard-component': ProjectCard
    },
    methods: {
        onSubmit() {
            doPutProject(this.$store, this.$eventHub, this.form);
        },
        doDelete(selectedProjectKey) {
            doDeleteProject(this.$store, this.$eventHub, selectedProjectKey)
        },
        toastrAddError(msg) {
            this.$refs.toastr.Add({
                msg: msg,
                type: "error"
            });
        }
    }
}
</script>
