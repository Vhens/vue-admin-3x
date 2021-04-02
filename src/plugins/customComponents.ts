/*
 * @Author: Vhen
 * @Date: 2021-03-16 14:36:54
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-31 09:51:08
 * @Description: 全局注册自定义组件
 */
import { App } from 'vue';
import SvgIcon from '@/components/svgIcon/index.vue';
import '@/icons';

const firstUpperCase = ([first, ...res]: any) => first.toUpperCase() + res.join('');

const humpType = (str: any) =>
  str.replace(/\-[a-z]/g, (a: string, b: number) =>
    b === 0 ? a.replace('-', '') : a.replace('-', '').toUpperCase()
  );

export const setupCustomComponents = (app: App) => {
  /**
   * 读取componetns下的vue文件并自动注册全局组件
   */
  const requireComponent = require.context(
    // 其组件目录的相对路径
    '@/components',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /\.vue$/
  );
  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const arrStr = fileName.split('/');
    const fileStr = humpType(arrStr[1]);
    const componentName = `v${firstUpperCase(fileStr)}`;
    app.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
    );
  });
  app.component(SvgIcon.name, SvgIcon);
};
