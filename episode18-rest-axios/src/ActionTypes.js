import {
    UPDATE_PROJECTLIST,
    PUT_PROJECT,
    DELETE_PROJECT,
    DELETE_PROJECT_SUCCESS
} from './core/MutationTypes';

import Vue from 'vue';

const PROJECT_URI = '/api/projects';

const ANIMATION_WAITTIME_MS = 1000;

const updateProjectList_Action = (url) => {
    return {
        type: UPDATE_PROJECTLIST,
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

export const doUpdateProjectList = ($store, $eventHub) => {
    $store.dispatch( // dispatch with an object
        updateProjectList_Action(PROJECT_URI)
    ).catch((err) => {
        $eventHub.$emit('on-failure', err.message);
    });
}

export const doPutProject = ($store, $eventHub, form) => {
    return $store.dispatch( // dispatch with an object
        putProject_Action(PROJECT_URI, form.getPayload())
    ).then(() => {
        form.reset();
        $store.dispatch( // dispatch with an object
            updateProjectList_Action(PROJECT_URI));
    }).catch((err) => {
        if (err.response) {
            console.info(err.response);
            form.fieldErrors.record(err.response.data.fieldErrors);
        } else {
            $eventHub.$emit('on-failure', err.message);
        }
    });
}

export const doDeleteProject = ($store, $eventHub, projectKey) => {
    return $store.dispatch( // dispatch with an object
        deleteProject_Action(PROJECT_URI, projectKey)
    ).then(() => {
        $eventHub.$emit('on-deleted', projectKey);
        setTimeout(function() {
            $store.dispatch(
                deleteProject_OnSuccess_Action(projectKey)
            )
        }, ANIMATION_WAITTIME_MS);
    }).catch((err) => {
        $eventHub.$emit('on-failure', err.message);
        $store.dispatch( // dispatch with an object
            updateProjectList_Action(PROJECT_URI));
    });
}
