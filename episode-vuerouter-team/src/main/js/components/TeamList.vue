<template>
<div class="list-group">
  <router-link v-for="team in teams" :key="team.id" :to="`/teams/${team.id}`" class="list-group-item">
    {{ team.name }}
  </router-link>
</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex';
import {
  FN_FETCH_TEAMS,
  FN_SELECT_TEAM
} from '../store/modules/teams-fnct-types';
import {
  default as bm
} from 'vue-inject';
import {
  DI_TEAMS_URI
} from '../config/AppConstants';
export default {
  computed: {
    ...mapState('teams', {teams: state => state.teams, selectedTeam: state => state.selectedTeam})
  },
  methods: {
    ...mapActions('teams', [FN_FETCH_TEAMS, FN_SELECT_TEAM])
  },
  mounted () {
    let teamsUri = bm.get(DI_TEAMS_URI);
    this.fn_fetchTeams(teamsUri);
  }
};
</script>
