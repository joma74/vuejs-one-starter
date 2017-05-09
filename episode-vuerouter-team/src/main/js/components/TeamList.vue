<template>
<div class="list-group">
  <router-link v-for="team in teams" v-bind:key="team.id" v-bind:to="`/teams/${team.id}`" class="list-group-item">
    {{ team.name }}
  </router-link>
</div>
</template>

<script>
import {
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
      teams: function () {
        return this.$store.getters.teams;
      },
      selectedTeam: function () {
        return this.$store.getters.selectedTeam;
      }
  },
  methods: mapActions([
    FN_FETCH_TEAMS,
    FN_SELECT_TEAM
  ]),
  mounted () {
    let teamsUri = bm.get(DI_TEAMS_URI);
    this[FN_FETCH_TEAMS]({
      url: teamsUri
    });
  }
};
</script>
