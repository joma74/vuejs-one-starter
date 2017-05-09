<template>
<div id="app">
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-2 menu-pane">
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
      </div>
      <div class="col-xs-10">
        <div class="row">
          <div class="col-xs-4">
            <router-view></router-view>
          </div>
          <div class="col-xs-8">
            <router-view name="detail"></router-view>
          </div>
        </div>
      </div>
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
