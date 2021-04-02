/*
 * @Author: Vhen
 * @Date: 2021-03-29 17:13:41
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-29 17:17:21
 * @Description: 自定义指令 权限验证
 */

import { Directive } from 'vue';

const permission: Directive = (el, binding, vnode, prevVNode) => {
  const { value } = binding;
  if (value) {
    // ....
    console.log(value);
  } else {
    throw new Error(`need roles! Like v-permission="['admin','test']" or v-permission="'test'"`);
  }
};

export default permission;
