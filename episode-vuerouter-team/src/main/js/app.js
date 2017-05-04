import Vue from 'vue';
import App from 'components/App';
import { Store } from './store/index';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: Store,
  render: h => h(App)
});
