import Vue from 'vue';
import Vuex from 'vuex';
import Projects from './Projects';
import {
    UPDATE_PROJECTLIST,
    PUT_PROJECT
} from './MutationTypes'

Vue.use(Vuex);

export const Store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', // whenever Vuex state is
    // mutated outside of mutation handlers, an error will be thrown. Make
    // sure to turn it off in production to avoid the performance cost.
    state: {
        projects: new Projects()
    },
    getters: {
        projects: state => state.projects
    },
    mutations: {
        // The handler function always receives ..
        [UPDATE_PROJECTLIST]( // ES2015 computed property name feature to
            // use a constant as the function name
            state, // .. state as the first argument
            response // .. and a second payload argument if there is one
        ) {
            //state.projects.updateProjectList(dispatchParamO.url);
            state.projects.projectArray = response.data.projects;
        }
    },
    actions: {
        // The handler function receives a context object that exposes
        // {state, rootState, commit, dispatch, getters}
        UPDATE_PROJECTLIST(ctx, dispatchParamO) {
            return new Promise((resolve, reject) => {
                ctx.state.projects.getProjects(dispatchParamO.url)
                    .then((response) => {
                        ctx.commit(UPDATE_PROJECTLIST, response);
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
        PUT_PROJECT(ctx, dispatchParamO) {
            return new Promise((resolve, reject) => {
                ctx.state.projects.putProject(dispatchParamO.url, dispatchParamO.newProject)
                    .then(() => {
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    });
            });
        }
    }
});
