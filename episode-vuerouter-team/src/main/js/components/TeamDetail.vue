<template>
<div v-if="selectedTeam.id" class="detail-pane">
  <form class="form-horizontal" @submit.prevent>
    <form-group id="teamId" label="Id" :value="selectedTeam.id"></form-group>
    <form-group id="teamName" label="Name" :value="selectedTeam.name"></form-group>
    <form-group id="stadiumName" label="Stadium" :value="selectedTeam.stadium.name"></form-group>
    <form-group id="stadiumPostcode" label="Postcode" :value="selectedTeam.stadium.postcode"></form-group>
    <form-group id="stadiumCapacity" label="Capacity" :value="selectedTeam.stadium.capacity"></form-group>
    <div class="form-group">
      <div class="col-sm-offset-3 col-sm-9">
        <button type="submit" class="btn btn-default" @click="closeDetail">Close</button>
      </div>
    </div>
  </form>
</div>
<div v-else class="error">
  Team with id of <b>{{ id }}</b> not found
</div>
</template>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
import {
  FN_SELECT_TEAM
} from '../store/modules/teams-fnct-types';
import FormGroup from './FormGroup.vue';

export default {
  props: ['id'],
  components: {
    FormGroup
  },
  computed: {
    selectedTeam: function() {
      return this.$store.getters.selectedTeam;
    }
  },
  methods: {
    ...mapActions([
      FN_SELECT_TEAM
    ]),
    closeDetail() {
      this[FN_SELECT_TEAM](undefined);
      this.$router.push('/teams');
    }
  },
  created() {
    this[FN_SELECT_TEAM](this.id);
  },
  watch: {
    id(newId) { // whenever the id changes, reslect the data
      this[FN_SELECT_TEAM](newId);
    }
  }
}
</script>
<style>
.detail-pane {
  padding-top: 10px;
  padding-right: 10px;
  border: #c0c0c0 1px solid;
}

.error {
  color: crimson;
}
</style>
