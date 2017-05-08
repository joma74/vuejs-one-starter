import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';

require('./config/AppConfig');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
});
