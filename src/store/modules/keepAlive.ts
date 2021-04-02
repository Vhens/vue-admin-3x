/*
 * @Author: Vhen
 * @Date: 2021-03-31 16:37:48
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-31 16:38:45
 * @Description: keepAlive
 */

const state = {
  list: [],
};

const getters = {};

const actions = {};

const mutations = {
  add(state: any, name: string) {
    !state.list.includes(name) && state.list.push(name);
  },
  remove(state: any, name: string) {
    state.list = state.list.filter((v: string) => {
      return v != name;
    });
  },
  clean(state: any) {
    state.list = [];
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
