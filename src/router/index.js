import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // 前台畫面
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Front/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Front/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Front/Login.vue'),
  },
  // 後台畫面
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Backend/Dashboard.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
