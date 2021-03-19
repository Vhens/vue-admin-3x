import { createApp } from 'vue';
import App from '@/App';

import router, { setupRouter } from '@/router';
import { setupStore } from '@/store';

import { setupElementPlus, setupCustomComponents } from '@/plugins';
(async () => {
  const app = createApp(App);

  // 注册全局ElementPlus,
  setupElementPlus(app);
  // 注册全局自定义组件,
  setupCustomComponents(app);

  // 挂载vuex状态管理
  setupStore(app);

  // 挂载路由
  setupRouter(app);
  // 路由准备就绪后挂载APP实例
  await router.isReady();
  app.mount('#app', true);
  // router.isReady().then(() => app.mount('#app'));
})();
