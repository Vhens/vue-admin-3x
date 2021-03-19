/*
 * @Author: Vhen
 * @Date: 2021-03-16 16:16:22
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-16 16:17:52
 * @Description:  Localstorage 存储到客户端
 */

export class LocalStorageAPI {
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        throw new Error('本地存储内存不足');
      } else {
        throw new Error(e.name);
      }
    }
  }

  get(key: string): string {
    return localStorage.getItem(key) || '';
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  setExpire(key: string, value: string, expire: number): void {
    const currTime = new Date().getTime();
    return this.set(key, JSON.stringify({ val: value, time: currTime + expire }));
  }

  getExpire(key: string): string {
    const val: string = this.get(key);
    const dataObj = JSON.parse(val);
    if (new Date().getTime() - dataObj.time > 0) {
      return dataObj.val;
    } else {
      return '';
    }
  }
}
