import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "recharge",
    meta: {
      title: "微信充值",
      keepAlive: true
    },
    component: () => import("../views/Recharge/index.vue"),
  },
  {
    path: "/recharge",
    name: "recharge",
    meta: {
      title: "微信充值",
      keepAlive: true
    },
    component: () => import("../views/Recharge/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "绑定工号"
    },
    component: () => import("../views/Register/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录中"
    },
    component: () => import("../views/Login/index.vue"),
  },
  {
    path: "/finish",
    name: "Finish",
    meta: {
      title: "充值完成"
    },
    component: () => import("../views/Finish/index.vue"),
  },
  {
    path: "/details",
    name: "Details",
    meta: {
      title: "充值明细"
    },
    component: () => import("../views/Details/index.vue"),
  },
  {
    path: "/unbind",
    name: "Unbind",
    meta: {
      title: "解绑账户"
    },
    component: () => import("../views/Unbind/index.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router;
