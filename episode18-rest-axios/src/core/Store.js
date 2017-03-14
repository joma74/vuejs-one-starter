import Vue from 'vue';
import Vuex from 'vuex';
import Projects from './Projects';
import {
    UPDATE_PROJECTLIST,
    PUT_PROJECT,
    DELETE_PROJECT,
    DELETE_PROJECT_SUCCESS
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
        },
        [DELETE_PROJECT_SUCCESS](
            state,
            projectKey
        ) {
            let _projectArray = state.projects.projectArray;
            for (let i = _projectArray.length - 1; i--;) {
                if (_projectArray[i].key === projectKey) {
                    _projectArray.splice(i, 1);
                }
            }
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
        },
        DELETE_PROJECT(ctx, dispatchParamO) {
            return new Promise((resolve, reject) => {
                let encodedProjectKey = encodeURIComponent(dispatchParamO.projectKey);
                ctx.state.projects.deleteProject(dispatchParamO.url + '/' + encodedProjectKey)
                    .then(() => {
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
        DELETE_PROJECT_SUCCESS(ctx, dispatchParamO) {
            ctx.commit(DELETE_PROJECT_SUCCESS, dispatchParamO.projectKey);
        }
    }
});
