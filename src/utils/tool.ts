/*
 * @Author: Vhen
 * @Date: 2021-03-16 15:56:00
 * @LastEditors: Vhen
 * @LastEditTime: 2021-04-01 17:29:37
 * @Description:
 */

/**
 *将对象添加当作参数拼接到URL上面
 * @param baseUrl 需要拼接的url
 * @param obj 参数对象
 * @returns 拼接后的对象
 * 例子:
 * let obj = {a: '2', b: '4'}
 * setObjToUrlParams('www.baidu.com', obj)
 * ==>www.baidu.com?a=2&b=4
 */
export const setObjToUrlParams = (baseUrl: string, obj: any): string => {
  let parameters = '';
  let url = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters;
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters;
  }
  return url;
};

export const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

export const deepClone = (target: any) => {
  // 定义一个变量
  let result: any;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]));
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
};
