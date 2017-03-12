import {
    UPDATE_PROJECTLIST
} from './core/MutationTypes'

export const updateProjectListAction = (url) => {
    return {
        type: UPDATE_PROJECTLIST,
        url: url
    }
}
