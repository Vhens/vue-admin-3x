/*
 * @Author: Vhen
 * @Date: 2021-03-16 14:36:54
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-17 11:09:57
 * @Description:
 */
import { App } from 'vue';
import SvgIcon from '@/components/svgIcon/index.vue';
import '@/icons';
/**
 * 全局注册自定义组件
 * @param app
 */
export const setupCustomComponents = (app: App) => {
  app.component(SvgIcon.name, SvgIcon);
};
