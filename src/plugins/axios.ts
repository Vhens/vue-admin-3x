/*
 * @Author: Vhen
 * @Date: 2021-03-16 14:05:24
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-16 15:20:33
 * @Description:
 */
import { App } from 'vue';
import { http } from '../http';
import { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios?: AxiosInstance;
  }
}
export const setupAxios = {
  install(app: App): void {
    app.config.globalProperties.$axios = http;
  },
};

/**
 *  在main.ts里面引入
 *  vue文件使用
 * 使用getCurrentInstance方法获取当前vdom实例
 *  const http = getCurrentInstance()?.appContext.config.globalProperties.$axios;
 */
