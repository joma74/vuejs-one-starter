import {
    DI_ANIMATION_WAITTIME_MS,
    DI_EVENT_HUB,
    DI_PROJECT_URI,
    DI_VUEX_STORE
} from '../core/AppConstants';

import {
    refreshProjects_Action,
    putProject_Action,
    deleteProject_Action,
    deleteProject_OnSuccess_Action
} from '../store/actions';

import {
    default as bm
} from 'vue-inject';

import * as evt from "./event-types"

export const doRefreshProjects = () => {
    let $store = bm.get(DI_VUEX_STORE);
    let $eventHub = bm.get(DI_EVENT_HUB);
    let projectUri = bm.get(DI_PROJECT_URI);
    $store.dispatch( // dispatch with an object
        refreshProjects_Action(projectUri)
    ).then(() => {
        $eventHub.$emit(evt.ON_SUCCESS, 'Projects have been refreshed');
    }).catch((err) => {
        $eventHub.$emit(evt.ON_FAILURE, err.message);
    });
}

export const doPutProject = (form) => {
    let $store = bm.get(DI_VUEX_STORE);
    let $eventHub = bm.get(DI_EVENT_HUB);
    let projectUri = bm.get(DI_PROJECT_URI);
    return $store.dispatch( // dispatch with an object
        putProject_Action(projectUri, form.getPayload())
    ).then(() => {
        $eventHub.$emit(evt.ON_SUCCESS, 'Project has been created');
        form.reset();
        return $store.dispatch( // dispatch with an object
            refreshProjects_Action(projectUri));
    }).catch((err) => {
        if (err.response) { // validation errors
            console.info(err.response);
            form.fieldErrors.record(err.response.data.fieldErrors);
        } else {
            console.warn(err.stack || err);
            $eventHub.$emit(evt.ON_FAILURE, err.message);
        }
    });
}

export const doDeleteProject = (projectKey) => {
    let $store = bm.get(DI_VUEX_STORE);
    let $eventHub = bm.get(DI_EVENT_HUB);
    let projectUri = bm.get(DI_PROJECT_URI);
    let animation_waittime_ms = bm.get(DI_ANIMATION_WAITTIME_MS);
    return $store.dispatch( // dispatch with an object
        deleteProject_Action(projectUri, projectKey)
    ).then(() => {
        $eventHub.$emit(evt.ON_DELETED, projectKey);
        $eventHub.$emit(evt.ON_SUCCESS, 'Project has been deleted');
        setTimeout(function() {
            $store.dispatch(
                deleteProject_OnSuccess_Action(projectKey)
            )
        }, animation_waittime_ms);
    }).catch((err) => {
        $eventHub.$emit(evt.ON_FAILURE, err.message);
        $store.dispatch( // dispatch with an object
            refreshProjects_Action(projectUri));
    });
}
