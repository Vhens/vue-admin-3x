/*
 * @Author: Vhen
 * @Date: 2021-03-16 14:29:14
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-16 14:32:45
 * @Description: ElementPlus
 */
import type { App } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';


export const setupElementPlus =(app: App<Element>)=> {
  app.use(ElementPlus, { locale })
}
