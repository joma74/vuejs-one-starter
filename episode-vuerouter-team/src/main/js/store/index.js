import Vue from 'vue';
import Vuex from 'vuex';
import teams from './modules/teams';
import { C_NODEENV_PRODUCTION } from '../config/AppConstants';

Vue.use(Vuex);

export default {
  store: new Vuex.Store({
    modules: {
      teams: {
        namespaced: true
      }
    },
    strict: (process.env.NODE_ENV !== C_NODEENV_PRODUCTION)
  })
};

// https://vuex.vuejs.org/en/hot-reload.html
if (module.hot) {
  // accept actions and mutations as hot modules
  module.hot.accept(['./modules/teams'], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output
    const reRequiredTeams = require('./modules/teams').default;
    // swap in the new actions and mutations
    this.store.hotUpdate({
      modules: {
        reRequiredTeams,
        namespaced: true
      }
    });
  });
}
