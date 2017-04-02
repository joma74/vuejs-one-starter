import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './mutation-types'
import {
    actions
} from './actions'
import projects from './modules/projects'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export const Store = new Vuex.Store({
    actions,
    modules: {
        projects
    },
    strict: debug
})

// https://vuex.vuejs.org/en/hot-reload.html
if (module.hot) {
    // accept actions and mutations as hot modules
    module.hot.accept(['./modules/projects'], () => {
        // require the updated modules
        // have to add .default here due to babel 6 module output
        const newModuleProjects = require('./modules/projects').default
        // swap in the new actions and mutations
        store.hotUpdate({
            modules: {
                newModuleProjects
            }
        })
    })
}
