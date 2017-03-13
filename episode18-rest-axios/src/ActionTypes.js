import {
    UPDATE_PROJECTLIST
} from './core/MutationTypes';
import Vue from 'vue';

const PROJECT_URI = '/api/projects';

export const updateProjectListActionParam = (url) => {
    return {
        type: UPDATE_PROJECTLIST,
        url: url
    }
}

export const doUpdateProjectList = ($store, $eventHub) => {
    $store.dispatch( // dispatch with an object
        updateProjectListActionParam(PROJECT_URI)
    ).catch((err) => {
        $eventHub.$emit('on-failure', err.message);
    });
}
