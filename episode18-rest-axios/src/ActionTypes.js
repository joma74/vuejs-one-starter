import {
    UPDATE_PROJECTLIST,
    PUT_PROJECT
} from './core/MutationTypes';

import Vue from 'vue';

const PROJECT_URI = '/api/projects';

export const updateProjectListActionParam = (url) => {
    return {
        type: UPDATE_PROJECTLIST,
        url: url
    }
}

export const putProjectActionParam = (url, newProject) => {
    return {
        type: PUT_PROJECT,
        url: url,
        newProject: newProject
    }
}

export const doUpdateProjectList = ($store, $eventHub) => {
    $store.dispatch( // dispatch with an object
        updateProjectListActionParam(PROJECT_URI)
    ).catch((err) => {
        $eventHub.$emit('on-failure', err.message);
    });
}

export const doPutProject = ($store, $eventHub, form) => {
    $store.dispatch( // dispatch with an object
        putProjectActionParam(PROJECT_URI, form.getPayload())
    ).then(() => {
        form.reset();
        $store.dispatch( // dispatch with an object
            updateProjectListActionParam(PROJECT_URI));
    }).catch((err) => {
        if (err.response) {
            console.info(err.response);
            form.fieldErrors.record(err.response.data.fieldErrors);
        } else {
            $eventHub.$emit('on-failure', err.message);
        }
    });
}
