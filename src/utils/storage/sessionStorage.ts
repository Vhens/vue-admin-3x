/*
 * @Author: Vhen
 * @Date: 2021-03-16 16:18:54
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-16 16:19:27
 * @Description: sessionStorage 存储到客户端
 */
export class SessionStorageAPI {
  set(key: string, value: string): void {
    return sessionStorage.setItem(key, value);
  }

  get(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  remove(key: string): void {
    return sessionStorage.removeItem(key);
  }
}
