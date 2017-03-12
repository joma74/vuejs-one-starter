import Vue from 'vue';
import App from './App.vue';
import { Store } from './core/Store.js';

const eventHub = new Vue();
Vue.prototype.$eventHub = eventHub;

new Vue({
  store: Store,
  el: '#app',
  render: h => h(App)
})
