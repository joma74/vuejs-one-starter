<template>
<div id="app">
  <div class="container-fluid">
    <div class="row">
      <section class="col-xs-2 menu-pane" section-test-id="navigation">
        <ul class="nav nav-stacked">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/teams">Teams</router-link>
          </li>
          <li>
            <router-link to="/about">Abouts</router-link>
          </li>
        </ul>
      </section>
      <section class="col-xs-10" section-test-id="content">
        <div class="row">
          <section class="col-xs-4" section-test-id="team-list">
            <router-view></router-view>
          </section>
          <section class="col-xs-8" section-test-id="team-detail">
            <router-view name="detail"></router-view>
          </section>
        </div>
      </section>
    </div>
  </div>
</div>
</template>

<script>

</script>

<style scoped>
#app {
  margin-top: 2px;
}

.router-link-exact-active {
  background-color: #eeeeee;
}

.menu-pane {
  background-color: #c0c0c0;
  padding-top: 10px;
  min-height: 600px;
}
</style>
