import * as type from './mutation-types'
import * as svc from '../api/projects-svc'

const refreshProjects_Action = (url) => {
    return {
        type: type.REFRESH_PROJECTS,
        url: url
    }
}

const putProject_Action = (url, newProject) => {
    return {
        type: type.PUT_PROJECT,
        url: url,
        newProject: newProject
    }
}

const deleteProject_Action = (url, projectKey) => {
    return {
        type: type.DELETE_PROJECT,
        url: url,
        projectKey: projectKey
    }
}

const deleteProject_OnSuccess_Action = (projectKey) => {
    return {
        type: type.DELETE_PROJECT_SUCCESS,
        projectKey: projectKey
    }
}

const actions = {
    // The handler function receives a context object that exposes
    // {state, rootState, commit, dispatch, getters}
    [type.PUT_PROJECT](ctx, dispatchParamO) {
        return new Promise((resolve, reject) => {
            svc.putProject(dispatchParamO.url, dispatchParamO.newProject)
                .then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
        });
    },
    // The handler function receives a context object that exposes
    // {state, rootState, commit, dispatch, getters}
    [type.DELETE_PROJECT](ctx, dispatchParamO) {
        return new Promise((resolve, reject) => {
            let encodedProjectKey = encodeURIComponent(dispatchParamO.projectKey);
            svc.deleteProject(dispatchParamO.url + '/' + encodedProjectKey)
                .then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
        });
    }
}

export {
    actions,
    refreshProjects_Action,
    putProject_Action,
    deleteProject_Action,
    deleteProject_OnSuccess_Action
}
