<template>
<div>
    <nav class="level heading">
        <div class="level-item has-text-centered">
            <p class="title is-2">Enter New Project</p>
        </div>
    </nav>

    <form method="post" action="/projects" @submit.prevent="doEnterNewProject" @keydown="form.fieldErrors.clear($event.target.name)" autocomplete="off">
        <nav class="level">
            <p class="level-item has-text-centered">
                <button class="button is-primary" :disabled="form.fieldErrors.any()">Enter</button>
            </p>
        </nav>
        <div class="container is-fluid columns">
            <p class="column">
                <label for="name" class="label">Project Name:</label>
                <input type="text" id="name" name="name" class="input" v-model="form.name" placeholder="Insert Your Project Name Here...">
                <span class="help is-danger" v-if="form.fieldErrors.has('name')" v-text="form.fieldErrors.get('name')">This name is invalid</span>
            </p>
            <p class="column">
                <label for="description" class="label">Project Description:</label>
                <input type="text" id="description" name="description" class="input" v-model="form.description" placeholder="Insert Your Project Description Here...">
                <span class="help is-danger" v-if="form.fieldErrors.has('description')" v-text="form.fieldErrors.get('description')">This description is invalid</span>
            </p>
        </div>
    </form>

    <nav class="level heading">
        <div class="level-item has-text-centered">
            <p class="title is-2">My Projects <span class="tag is-info" style="vertical-align: super">{{ projectsLength }}</span>
            </p>
        </div>
    </nav>
    <nav class="level">
        <div class="level-item has-text-centered">
            <a class="button is-primary" @click="doRefreshProjects"><i class="icon-arrows-cw"></i></a>
        </div>
    </nav>
    <div class="container is-fluid">
        <div class="columns is-multiline is-fluid">
            <projectcard-component v-for="(project, index, key) in projects.projectArray" v-bind:project="project" v-bind:index="index" v-bind:key="project.key" v-on:doDelete="doDelete(project.key, index)"></projectcard-component>
        </div>
    </div>
    <vue-toastr ref="toastr"></vue-toastr>
</div>
</template>

<script>
import {
    doRefreshProjects,
    doPutProject,
    doDeleteProject
} from './ActionTypes'
import Form from './core/Form';
import ProjectCard from './ProjectCard.vue';
import Toastr from 'vue-toastr';

export default {
    name: 'app',
    computed: {
        projects: function() {
            return this.$store.getters.projects;
        },
        projectsLength: function() {
            return ("0" + this.$store.getters.projects.projectArray.length).slice(-2);
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
        this.$eventHub.$on('on-failure', this.toastrAdd("error", this))
        this.$eventHub.$on('on-success', this.toastrAdd("success", this))
    },
    beforeDestroy: function() {
        this.$eventHub.$off('on-failure', this.toastrAdd("error", this))
        this.$eventHub.$off('on-success', this.toastrAdd("success", this))
    },
    mounted() {
        // doRefreshProjects uses toastr component on success and on failure, so needs
        // to be called in mounted
        doRefreshProjects(this.$store)
        // config is set on component instance, so must be mounted
        this.$refs.toastr.defaultCloseOnHover = false;
        this.$refs.toastr.defaultTimeout = 5000;
        this.$refs.toastr.defaultPosition = "toast-bottom-right";
    },
    components: {
        'vue-toastr': Toastr,
        'projectcard-component': ProjectCard
    },
    methods: {
        doEnterNewProject() {
            doPutProject(this.form);
        },
        doDelete(selectedProjectKey) {
            doDeleteProject(selectedProjectKey)
        },
        doRefreshProjects() {
            doRefreshProjects();
        },
        toastrAdd(type) {
            let $scope = this;
            return function(msg) {
                $scope.$refs.toastr.Add({
                    msg: msg,
                    type: type
                });
            }
        }
    }
}
</script>
