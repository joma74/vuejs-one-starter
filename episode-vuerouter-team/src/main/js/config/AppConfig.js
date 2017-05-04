import Vue from 'vue';
import {
  default as bm
} from 'vue-inject';
import {
  DI_PROJECT_URI,
  C_PROJECT_URI,
  DI_APPL_URL,
  C_APPL_URL,
  DI_HTTP_SERVICE,
  DI_VUEX_STORE
}
from './AppConstants';
import axios from 'axios';
import store from 'store/index';

// register DI plugin with Vue
Vue.use(bm);
// DI value constants
bm.constant(DI_PROJECT_URI, C_PROJECT_URI);
bm.constant(DI_APPL_URL, C_APPL_URL);
axios.defaults.baseURL = bm.get(DI_APPL_URL); // set axios baseURL
// axios as DI bean
bm.constant(DI_HTTP_SERVICE, axios);
// vuex store as DI bean
bm.constant(DI_VUEX_STORE, store);
