/*
 * @Author: Vhen
 * @Date: 2021-04-01 15:06:40
 * @LastEditors: Vhen
 * @LastEditTime: 2021-04-22 13:53:43
 * @Description:
 */

import { deepClone } from '@/utils/tool';
const state = {
  routes: [],
  navActiveIndex: 0,
  isGenerate: false,
};

const getters = {
  sidebarRoutes: (state: any) => {
    return state.routes[state.navActiveIndex].children;
  },
};
const mutations = {
  /**初始化路由 */
  initRoutes(state: any) {
    state.isGenerate = false;
    state.navActiveIndex = 0;
  },
  // 设置路由
  setRoutes(state: any, routes: any) {
    state.isGenerate = true;
    let newRoutes = deepClone(routes);
    state.routes = newRoutes.filter((item: any) => {
      return item.children.length != 0;
    });
  },
  // 根据路由判断属于哪个头部导航
  setNavActive(state: any, path: string) {
    state.routes.map((item: any, index: number) => {
      if (
        item.children.some((v: any) => {
          return path.indexOf(v.path + '/') === 0 || path == v.path;
        })
      ) {
        console.log('index', index);
        state.navActiveIndex = index;
      }
    });
  },
  // 切换头部导航
  switchNavActive(state: any, index: number) {
    state.navActiveIndex = index;
  },
};

const actions = {
  generateRoutes({ rootState, dispatch, commit }: any, data: any) {
    return new Promise(async (resolve) => {
      let accessedRoutes;
      accessedRoutes = data.asyncRoutes;
      commit('setRoutes', accessedRoutes);
      commit('setNavActive', data.currentPath);
      const routes: any = [];
      accessedRoutes.map((item: any) => {
        routes.push(...item.children);
      });
      resolve(routes);
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
