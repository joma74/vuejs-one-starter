import { FN_FETCH_TEAMS, FN_SELECT_TEAM } from './teams-fnct-types';
import * as svc from '../../api/svc-teams';

const state = {
  selectedTeam: '',
  teams: []
};

const getters = {
  teams: state => state.teams,
  selectedTeam: state => state.selectedTeam
};

const actions = {
  [FN_FETCH_TEAMS] ({commit}, dispatchParamO) {
    return new Promise((resolve, reject) => {
      svc.fetchTeams(dispatchParamO.url)
        .then((response) => {
          commit(FN_FETCH_TEAMS, response);
          resolve();
        }).catch((err) => {
          reject(err);
        });
    });
  },
  [FN_SELECT_TEAM] ({commit}, teamKey) {
    commit(FN_SELECT_TEAM, teamKey);
  }
};

const mutations = {
  [FN_FETCH_TEAMS] (state, response) {
    state.teams = response.data;
  },
  [FN_SELECT_TEAM] (state, teamKey) {
    state.selectedTeam = teamKey;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
