import Vue from 'vue';
import {
  default as bm
} from 'vue-inject';
import {
  DI_TEAMS_URI,
  C_TEAMS_URI,
  DI_APPL_URL,
  C_APPL_URL,
  DI_HTTP_SERVICE,
  DI_VUEX_STORE
}
from './AppConstants';
import axios from 'axios';
import store from '../store';

// register DI plugin with Vue
Vue.use(bm);
// DI value constants
bm.constant(DI_TEAMS_URI, C_TEAMS_URI);
bm.constant(DI_APPL_URL, C_APPL_URL);
axios.defaults.baseURL = bm.get(DI_APPL_URL); // set axios baseURL
// axios as DI bean
bm.constant(DI_HTTP_SERVICE, axios);
// vuex store as DI bean
bm.constant(DI_VUEX_STORE, store);
