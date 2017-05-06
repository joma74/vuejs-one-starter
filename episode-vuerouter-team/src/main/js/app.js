import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
});
