import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import P1 from './P1.vue';
import P2 from './P2.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/p1', component: P1 },
    { path: '/p2', component: P2 },
    { path: '*', redirect: '/p1' },
  ],
});

export const VueApp = () => {
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#vue');
};

