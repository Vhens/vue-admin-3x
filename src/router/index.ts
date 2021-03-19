import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export const setupRouter = (app: App) => {
  app.use(router);
  // 创建路由守卫
};
export default router;
