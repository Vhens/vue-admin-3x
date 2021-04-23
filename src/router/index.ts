import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';
import store from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import type { AppRouteRecordRaw } from '@/router/types';
import Layout from '@/layout/index.vue';
import EmptyLayout from '@/layout/empty.vue';
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      isKeepAlive: false,
      isAuth: false,
      affix: false,
      icon: '',
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect: {
      name: '/dashboard',
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        meta: {
          title: '控制台',
          isKeepAlive: false,
          isAuth: false,
          affix: false,
          icon: '',
        },
      },
      {
        path: 'personal_center',
        name: 'personal_center',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/personalCenter/index.vue'),
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/reload/index.vue'),
      },
    ],
  },
];

import multilevelMenu from './modules/multilevelMenu';
// 当 children 不为空的主导航只有一项时，则隐藏
let asyncRoutes: any = [
  {
    meta: {
      title: '默认系统',
      icon: 'sidebar-default',
    },
    children: [multilevelMenu],
  },
  {
    meta: {
      title: '测试系统',
      icon: 'sidebar-default',
    },
    children: [
      {
        path: '/test',
        redirect: '/test/index',
        component: Layout,
        name: 'test',
        meta: {
          title: '测试',
          icon: 'sidebar-menu',
        },
        children: [
          {
            path: '',
            name: 'test1',
            meta: {
              title: 'test',
              sidebar: false,
            },
            component: () => import(/* webpackChunkName: "test" */ '@/views/test/index.vue'),
          },
        ],
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: constantRoutes,
  // scrollBehavior: () => ({ left: 0, top: 0 }),
  scrollBehavior(to, from, savedPosition) {
    // keep-alive 返回缓存页面后记录浏览位置
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition;
    }
    // 异步滚动操作
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 200);
    });
  },
});

export const setupRouter = (app: App) => {
  app.use(router);
  // 创建路由守卫
};

// 重新添加路由并消除路由重复警告
const selfAddRoutes = (route: any) => {
  route.forEach((item: any) => {
    router.addRoute(item);
  });
};

router.beforeEach(async (to, from, next) => {
  // @ts-ignore
  store.state.app.enableProgress && NProgress.start();
  // @ts-ignore
  if (store.state.menu.isGenerate) {
    store.commit('menu/setNavActive', to.path);
  }
  // @ts-ignore
  if (!store.state.menu.isGenerate) {
    const accessRoutes = await store.dispatch('menu/generateRoutes', {
      asyncRoutes,
      currentPath: to.path,
    });
    selfAddRoutes(accessRoutes);
    next({ ...to, replace: true });
  } else {
    next();
  }
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
