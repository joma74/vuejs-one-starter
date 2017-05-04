import {
  default as bm
} from 'vue-inject';
import {
  DI_VUEX_STORE,
  DI_TEAMS_URI
} from '../config/AppConstants';
import {
  FN_FETCH_TEAMS,
  FN_SELECT_TEAM
} from '..store/modules/teams-fnct-types';

export const doRefreshTeams = () => {
  let $store = bm.get(DI_VUEX_STORE);
  let teamsUri = bm.get(DI_TEAMS_URI);
  $store.dispatch(FN_FETCH_TEAMS, teamsUri);
};

export const doSelectTeam = (teamKey) => {
  let $store = bm.get(DI_VUEX_STORE);
  $store.dispatch(FN_SELECT_TEAM, teamKey);
};
