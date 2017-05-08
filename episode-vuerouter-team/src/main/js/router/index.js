import Vue from 'vue';
import Router from 'vue-router';
import About from '../components/About.vue';
import Home from '../components/Home.vue';
import TeamList from '../components/TeamList.vue';
import NotFoundComponent from '../components/NotFoundComponent.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/teams',
      component: TeamList
    },
    { path: '*',
      component: NotFoundComponent
    }
  ]
});
