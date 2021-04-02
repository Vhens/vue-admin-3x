import { createStore } from 'vuex';
import { App } from 'vue';

const modules: any = {};

const requireModule = require.context('./modules', false, /.ts$/);
requireModule.keys().forEach((fileName) => {
  // set './app.ts' => 'app'
  const moduleName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = requireModule(fileName);
  modules[moduleName] = value.default;
});

export const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: modules,
});

export const setupStore = (app: App) => {
  app.use(store);
};

export default store;
