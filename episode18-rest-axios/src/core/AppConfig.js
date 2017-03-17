import {default as bm} from 'vue-inject';
import axios from 'axios';
import Vue from 'vue';

import {
  DI_ANIMATION_WAITTIME_MS,
  DI_EVENT_HUB,
  DI_HTTP_SERVICE,
  DI_PROJECT_URI,
  DI_SERVER_URL
} from './AppConstants';
// register plugin with Vue
Vue.use(bm);
// register event hub as instance
Vue.prototype.$eventHub  = new Vue();
bm.constant(DI_EVENT_HUB, Vue.prototype.$eventHub);
// DI constants
bm.constant(DI_PROJECT_URI, '/api/projects');
bm.constant(DI_SERVER_URL, 'http://localhost:9095/rest-spring-server');
bm.constant(DI_HTTP_SERVICE, axios);
bm.constant(DI_ANIMATION_WAITTIME_MS, 1000);
// configure cookie support for axios - backend is RESTless stateful!
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');
axiosCookieJarSupport(axios);
// set axios baseURL
axios.defaults.baseURL = bm.get(DI_SERVER_URL);
