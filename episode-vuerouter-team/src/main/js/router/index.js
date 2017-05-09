import Vue from 'vue';
import Router from 'vue-router';
import About from '../components/About.vue';
import Home from '../components/Home.vue';
import TeamList from '../components/TeamList.vue';
import TeamDetail from '../components/TeamDetail.vue';
import NotFoundComponent from '../components/NotFoundComponent.vue';

Vue.use(Router);

// When props is set to true, the route.params will be set as the component
// props.

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
    {
      path: '/teams/:id',
      components: {
        default: TeamList,
        detail: TeamDetail
      },
      props: {
        default: false,
        detail: true
      }
    },
    { path: '*',
      component: NotFoundComponent
    }
  ]
});
