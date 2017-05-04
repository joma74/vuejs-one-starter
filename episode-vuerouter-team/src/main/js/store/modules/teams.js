import { FETCH_TEAMS, SELECT_TEAM } from './teams-fnct-types';
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
  [FETCH_TEAMS] ({commit}, dispatchParamO) {
    return new Promise((resolve, reject) => {
      svc.fetchTeams(dispatchParamO.url)
        .then((response) => {
          commit(FETCH_TEAMS, response);
          resolve();
        }).catch((err) => {
          reject(err);
        });
    });
  },
  [SELECT_TEAM] ({commit}, teamKey) {
    commit(SELECT_TEAM, teamKey);
  }
};

const mutations = {
  [FETCH_TEAMS] (state, response) {
    state.teams = response.data;
  },
  [SELECT_TEAM] (state, teamKey) {
    state.selectedTeam = teamKey;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
