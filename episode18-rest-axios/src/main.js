import Vue from 'vue';
import App from './components/App.vue';
import { Store } from './store/index';

require('./core/AppConfig');

new Vue({
  store: Store,
  el: '#app',
  render: h => h(App)
})
