import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from '../layout/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: 'home',
    component: Layout,
    redirect: "/Home",
    children: [{
      path: '/home',
      component: () => import('../views/Home.vue'),
      meta: {
        title: 'home',
      }
    }, {
      path: '/table',
      component: () => import('../views/Table.vue'),
      meta: {
        title: 'table',
      }
    }, {
      path: '/number',
      component: () => import('../views/Number.vue'),
      meta: {
        title: 'number',
      }
    }]
  },
  {
    path: "/404",
    name: '404',
    meta: {
      title: "404",
    },
    component: () => import("../views/404.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
      keepAlive: true
    },
    component: () => import("../views/LoginRegister.vue"),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: "注册",
      keepAlive: true
    },
    component: () => import('../views/LoginRegister.vue')
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    meta: {
      title: "404页面暂未找到",
      keepAlive: true
    },
    component: () => import("../views/404.vue"),
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + '';
  }

  next()
});

export default router;