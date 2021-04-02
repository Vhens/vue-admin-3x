/*
 * @Author: Vhen
 * @Date: 2021-03-23 16:09:33
 * @LastEditors: Vhen
 * @LastEditTime: 2021-04-02 15:21:53
 * @Description:
 */

export default {
  namespaced: true,
  state: {
    // 显示模式，支持：mobile、pc
    mode: 'pc',
    // 是否显示头部
    showHeader: true,
    // 侧边栏是否收起
    sidebarCollapse: false,
    // 是否始终显示主侧边栏，设置为 false 且主侧边栏里只有一个导航时，主侧边栏会自动隐藏
    alwaysShowMainSidebar: true,
    // 是否开启侧边栏展开收起按钮
    enableSidebarCollapse: false,
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
