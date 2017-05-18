import Vue from 'vue';
import vmApp from './App';
import store from './store';
import router from './router';

require('./config/AppConfig');

Vue.config.performance = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(vmApp)
});
