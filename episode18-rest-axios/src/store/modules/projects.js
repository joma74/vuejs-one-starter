import * as type from '../mutation-types'
import * as svc from '../../api/projects-svc'
import Projects from '../../core/Projects'


const state = {
    projects: new Projects()
}

const getters = {
    projects: state => state.projects,
    projectsLength: state => state.projects.projectArray.length
}

const mutations = {
    // The handler function always receives ..
    [type.REFRESH_PROJECTS]( // ES2015 computed property name feature to
        // use a constant as the function name
        state, // .. state as the first argument
        response // .. and a second payload argument if there is one
    ) {
        //state.projects.updateProjectList(dispatchParamO.url);
        state.projects.projectArray = response.data.projects;
    },
    [type.DELETE_PROJECT_SUCCESS](
        state,
        projectKey
    ) {
        let _projectArray = state.projects.projectArray;
        let index = _projectArray.findIndex(project => project.key === projectKey);
        if (index >= 0) {
            _projectArray.splice(index, 1);
        } else {
            console.warn(`Project with key ${projectKey} is defunct`);
        }
    }
}

const actions = {
    // The handler function receives a context object that exposes
    // {state, rootState, commit, dispatch, getters}
    [type.REFRESH_PROJECTS](ctx, dispatchParamO) {
        return new Promise((resolve, reject) => {
            svc.getProjects(dispatchParamO.url)
                .then((response) => {
                    ctx.commit(type.REFRESH_PROJECTS, response);
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
        });
    },
    // The handler function receives a context object that exposes
    // {state, rootState, commit, dispatch, getters}
    [type.DELETE_PROJECT_SUCCESS](ctx, dispatchParamO) {
        ctx.commit(type.DELETE_PROJECT_SUCCESS, dispatchParamO.projectKey);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
