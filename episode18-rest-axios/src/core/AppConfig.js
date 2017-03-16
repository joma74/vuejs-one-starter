import {default as bm} from 'vue-inject';
import axios from 'axios';
import Vue from 'vue';

import {
  DI_PROJECT_URI_NAME,
  DI_SERVER_URL_NAME,
  DI_HTTP_SERVICE_NAME,
  DI_ANIMATION_WAITTIME_MS_NAME
} from './AppConstants';
// register plugin with Vue
Vue.use(bm);
// register event hub as instance
Vue.prototype.$eventHub  = new Vue();
// DI constants
bm.constant(DI_PROJECT_URI_NAME, '/api/projects');
bm.constant(DI_SERVER_URL_NAME, 'http://localhost:9095/rest-spring-server');
bm.constant(DI_HTTP_SERVICE_NAME, axios);
bm.constant(DI_ANIMATION_WAITTIME_MS_NAME, 1000);
// configure cookie support for axios - backend is RESTless stateful!
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');
axiosCookieJarSupport(axios);
// set axios baseURL
axios.defaults.baseURL = bm.get(DI_SERVER_URL_NAME);
