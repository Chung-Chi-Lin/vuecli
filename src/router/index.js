import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/UserLogin.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('../views/LoginDashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/FactoryProducts.vue'),
      },
    ],
  },
  // {
  //   // 404頁面
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('../views/NotFound.vue'),
  //   created() {
  //     // path 為 "/" 既為根目錄，5000為毫秒
  //     setTimeout(() => this.$router.push({ path: '../views/ComponentC.vue' }), 5000);
  //   },
  // },
  // {
  //   // 重新導向頁面
  //   path: '/newPage/:pathMatch(.*)*',
  //   redirect: {
  //     name: 'Home',
  //   },
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active', // 點擊路由選項會有樣式
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, _savedPosition) {
    // console.log(to, from, savedPosition);
    // `to` 和 `from` 都是路由地址
    // `savedPosition` 可以为空，如果没有的话。
    if (to.fullPath.match('newPage')) {
      return {
        top: 0,
      };
    }
    return {
      top: 0,
    };
  },
});

export default router;
