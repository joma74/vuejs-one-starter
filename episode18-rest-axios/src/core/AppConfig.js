import axios from 'axios';
import {
    default as bm
} from 'vue-inject';
import {
    Store
} from '../store/index';
import Vue from 'vue';
import {
    DI_ANIMATION_WAITTIME_MS,
    DI_EVENT_HUB,
    DI_HTTP_SERVICE,
    DI_PROJECT_URI,
    DI_SERVER_URL,
    DI_VUEX_STORE
} from './AppConstantNames';
import {
    PROJECT_URI,
    SERVER_URL,
    ANIMATION_WAITTIME_MS
} from './AppConstantValues';


// register DI plugin with Vue
Vue.use(bm);
// register event hub
Vue.prototype.$eventHub = new Vue(); //  event hub as Vue property
bm.constant(DI_EVENT_HUB, Vue.prototype.$eventHub); //  event hub as DI bean
// DI value constants
bm.constant(DI_PROJECT_URI, C_PROJECT_URI);
bm.constant(DI_SERVER_URL, C_SERVER_URL);
bm.constant(DI_ANIMATION_WAITTIME_MS, C_ANIMATION_WAITTIME_MS);
// vuex store as DI bean
bm.constant(DI_VUEX_STORE, Store);
// configure cookie support for axios - backend is RESTless stateful!
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');
axiosCookieJarSupport(axios);
axios.defaults.baseURL = bm.get(DI_SERVER_URL); // set axios baseURL
bm.constant(DI_HTTP_SERVICE, axios); // axios as DI bean
