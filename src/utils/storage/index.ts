/*
 * @Author: Vhen
 * @Date: 2021-03-16 16:21:11
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-17 10:11:59
 * @Description: 统一封装对外的接口
 */

interface UseStoreType {
  set: Function;
  get: Function;
  remove: Function;
  setExpire?: Function;
  getExpire?: Function;
}

export default (store?: string): UseStoreType => {
  let UseStore;
  switch (store) {
    case 's':
      UseStore = require('@/utils/storage/sessionStorage').SessionStorageAPI;
      break;
    case 'c':
      UseStore = require('@/utils/storage//cookie').CookieAPI;
      break;
    case 'l':
      UseStore = require('@/utils/storage/localStorage').LocalStorageAPI;
      break;
    default:
      UseStore = require('@/utils/storage/sessionStorage').SessionStorageAPI;
      break;
  }
  return new UseStore();
};
