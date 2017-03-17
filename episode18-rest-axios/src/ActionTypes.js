import {
    REFRESH_PROJECTS,
    PUT_PROJECT,
    DELETE_PROJECT,
    DELETE_PROJECT_SUCCESS
} from './core/MutationTypes';


import {
    DI_ANIMATION_WAITTIME_MS,
    DI_EVENT_HUB,
    DI_PROJECT_URI
} from './core/AppConstants';

import Vue from 'vue';
import {
    default as bm
} from 'vue-inject';

const refreshProjects_Action = (url) => {
    return {
        type: REFRESH_PROJECTS,
        url: url
    }
}

const putProject_Action = (url, newProject) => {
    return {
        type: PUT_PROJECT,
        url: url,
        newProject: newProject
    }
}

const deleteProject_Action = (url, projectKey) => {
    return {
        type: DELETE_PROJECT,
        url: url,
        projectKey: projectKey
    }
}

const deleteProject_OnSuccess_Action = (projectKey) => {
    return {
        type: DELETE_PROJECT_SUCCESS,
        projectKey: projectKey
    }
}

export const doRefreshProjects = ($store) => {
    let $eventHub = bm.get(DI_EVENT_HUB);
    let projectUri = bm.get(DI_PROJECT_URI);
    $store.dispatch( // dispatch with an object
        refreshProjects_Action(projectUri)
    ).then(() => {
        $eventHub.$emit('on-success', 'Projects have been refreshed');
    }).catch((err) => {
        $eventHub.$emit('on-failure', err.message);
    });
}

export const doPutProject = ($store, form) => {
    let $eventHub = bm.get(DI_EVENT_HUB);
    let projectUri = bm.get(DI_PROJECT_URI);
    return $store.dispatch( // dispatch with an object
        putProject_Action(projectUri, form.getPayload())
    ).then(() => {
        $eventHub.$emit('on-success', 'Project has been created');
        form.reset();
        return $store.dispatch( // dispatch with an object
            refreshProjects_Action(projectUri));
    }).catch((err) => {
        if (err.response) { // validation errors
            console.info(err.response);
            form.fieldErrors.record(err.response.data.fieldErrors);
        } else {
            console.warn(err.stack || err);
            $eventHub.$emit('on-failure', err.message);
        }
    });
}

export const doDeleteProject = ($store, projectKey) => {
    let $eventHub = bm.get(DI_EVENT_HUB);
    let projectUri = bm.get(DI_PROJECT_URI);
    let animation_waittime_ms = bm.get(DI_ANIMATION_WAITTIME_MS);
    return $store.dispatch( // dispatch with an object
        deleteProject_Action(projectUri, projectKey)
    ).then(() => {
        $eventHub.$emit('on-deleted', projectKey);
        $eventHub.$emit('on-success', 'Project has been deleted');
        setTimeout(function() {
            $store.dispatch(
                deleteProject_OnSuccess_Action(projectKey)
            )
        }, animation_waittime_ms);
    }).catch((err) => {
        $eventHub.$emit('on-failure', err.message);
        $store.dispatch( // dispatch with an object
            refreshProjects_Action(projectUri));
    });
}
