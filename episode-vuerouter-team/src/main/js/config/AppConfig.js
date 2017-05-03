import Vue from 'vue';
import {
  default as bm
} from 'vue-inject';
import * as AC from './AppConstants';
import axios from 'axios';
import store from 'store/index';

// register DI plugin with Vue
Vue.use(bm);
// DI value constants
bm.constant(AC.DI_PROJECT_URI, AC.C_PROJECT_URI);
bm.constant(AC.DI_APPL_URL, AC.C_APPL_URL);
axios.defaults.baseURL = bm.get(AC.DI_APPL_URL); // set axios baseURL
// axios as DI bean
bm.constant(AC.DI_HTTP_SERVICE, axios);
// vuex store as DI bean
bm.constant(AC.DI_VUEX_STORE, store);
