import { createStore } from 'vuex';
import { App } from 'vue';

export const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});

export const setupStore = (app: App) => {
  app.use(store);
};

export default store;
