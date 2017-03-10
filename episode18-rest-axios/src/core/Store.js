import Vue from 'vue';
import Vuex from 'vuex';
import Projects from './Projects';

Vue.use(Vuex);

export const Store = new Vuex.Store({
    state: {
        projects: new Projects()
    },
    getters: {
        projects: state => state.projects
    },
    mutations: {
        updateProjectList(
            state,
            url) {
            state.projects.updateProjectList(url);
        }
    },
    actions: {
        UPDATE_PROJECT_LIST({
            commit,
            state
        }, url) {
            commit('updateProjectList', state, url);
        }
    }
});
