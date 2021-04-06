/*
 * @Author: Vhen
 * @Date: 2021-03-23 16:09:33
 * @LastEditors: Vhen
 * @LastEditTime: 2021-04-06 11:50:50
 * @Description:
 */
import { deepClone } from '@/utils/tool';
// 将多层嵌套路由处理成平级
const flatAsyncRoutes = (routes: any, breadcrumb: string, baseUrl = '') => {
  const res: any = [];
  routes.forEach((route: any) => {
    const tmp = { ...route };
    if (tmp.children) {
      let childrenBaseUrl = '';
      if (baseUrl == '') {
        childrenBaseUrl = tmp.path;
      } else if (tmp.path != '') {
        childrenBaseUrl = `${baseUrl}/${tmp.path}`;
      }
      let childrenBreadcrumb = deepClone(breadcrumb);
      if (route.meta.breadcrumb !== false) {
        childrenBreadcrumb.push({
          path: childrenBaseUrl,
          title: route.meta.title,
        });
      }
      let tmpRoute = deepClone(route);
      tmpRoute.path = childrenBaseUrl;
      tmpRoute.meta.breadcrumbNeste = childrenBreadcrumb;
      delete tmpRoute.children;
      res.push(tmpRoute);
      let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb, childrenBaseUrl);
      childrenRoutes.map((item: any) => {
        // 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
        if (res.some((v: any) => v.path == item.path)) {
          res.forEach((v: any, i: number) => {
            if (v.path == item.path) {
              res[i] = item;
            }
          });
        } else {
          res.push(item);
        }
      });
    } else {
      if (baseUrl != '') {
        if (tmp.path != '') {
          tmp.path = `${baseUrl}/${tmp.path}`;
        } else {
          tmp.path = baseUrl;
        }
      }
      // 处理面包屑导航
      let tmpBreadcrumb = deepClone(breadcrumb);
      if (tmp.meta.breadcrumb !== false) {
        tmpBreadcrumb.push({
          path: tmp.path,
          title: tmp.meta.title,
        });
      }
      tmp.meta.breadcrumbNeste = tmpBreadcrumb;
      res.push(tmp);
    }
  });
  return res;
};
export default {
  namespaced: true,
  state: {
    // 控制台名称
    dashboardTitle: '控制台',
    // 显示模式，支持：mobile、pc
    mode: 'pc',
    // 是否显示头部
    showHeader: false,
    // 侧边栏是否收起
    sidebarCollapse: false,
    // 是否始终显示主侧边栏，设置为 false 且主侧边栏里只有一个导航时，主侧边栏会自动隐藏
    alwaysShowMainSidebar: false,
    // 是否开启侧边栏展开收起按钮
    enableSidebarCollapse: true,
    // 是否显示底部版权信息，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
    showCopyright: true,
    // 是否开启全屏
    enableFullscreen: true,
    // 是否开启页面刷新
    enablePageReload: true,
    // 是否开启载入进度条
    enableProgress: true,
    // 是否开启控制台
    enableDashboard: true,
    // 是否开启主题配置
    enableThemeSetting: true,
    // 显示隐藏主题配置
    isShowThemeSetting: false,

    sidebarCollapseLastStatus: false,
  },
  mutations: {
    // 设置访问模式，页面宽度小于 992px 时切换为移动端展示
    setMode(state: any, width: number) {
      if (width < 992) {
        state.mode = 'mobile';
      } else {
        state.mode = 'pc';
      }
    },
    // 切换侧边栏导航展开/收起
    toggleSidebarCollapse(state: any) {
      state.sidebarCollapse = !state.sidebarCollapse;
      if (state.mode == 'pc') {
        state.sidebarCollapseLastStatus = !state.sidebarCollapseLastStatus;
      }
    },
    // 是否显示主题配置
    toggleThemeSetting(state: any) {
      state.isShowThemeSetting = !state.isShowThemeSetting;
    },
    // 更新主题配置
    updateThemeSetting(state: any, data: any) {
      Object.assign(state, data);
    },
  },
  actions: {},
  getters: {},
  modules: {},
};
