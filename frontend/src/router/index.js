import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/index.vue'),
    children: [
      {
        path: '/index',
        name: 'home',
        component: () => import('../views/home.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/profile/index.vue')
      },
      {
        path: '/other',
        name: 'other',
        component: () => import('../views/other/other.vue')
      },
      {
        path: '/userDetail',
        name: 'userDetail',
        component: () => import('../views/user/userDetail.vue')
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/user/register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/login.vue')
  },
  {
    path: '*',
    name: 'page404',
    component: () => import('../views/error_page/page404.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.getItem('eleToken');
  if (to.path === '/login' || to.path === '/register') {
    next();
  } else if (isLogin) {
    next();
  } else {
    next('/login');
  }
});

export default router;
