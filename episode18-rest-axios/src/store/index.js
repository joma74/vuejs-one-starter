import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './mutation-types'
import { actions } from './actions'
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
