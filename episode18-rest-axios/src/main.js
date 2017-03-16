import Vue from 'vue';
import App from './App.vue';
import { Store } from './core/Store.js';

require('./core/AppConfig.js');

new Vue({
  store: Store,
  el: '#app',
  render: h => h(App)
})
