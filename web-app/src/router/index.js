import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Vote from '../views/Vote.vue'
// import Engagement from '../views/Engagement.vue'

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'engagement',
  //   component: Engagement,
  // },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    props: true
  },
  {
    path: '/vote',
    name: 'vote',
    component: Vote,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
