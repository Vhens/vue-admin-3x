/*
 * @Author: Vhen
 * @Date: 2021-03-16 16:19:58
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-16 16:20:18
 * @Description: Cookie 存储到客户端
 */
export class CookieAPI {
  set(key: string, value: string, expire = 3600, path = '/'): void {
    const date = new Date();
    date.setSeconds(date.getSeconds() + expire);
    document.cookie =
      key + '=' + escape(value) + '; expires=' + date.toUTCString() + '; Path=' + path;
  }

  get(key: string): string {
    if (document.cookie.length > 0) {
      let cStart = document.cookie.indexOf(key + '=');
      if (cStart !== -1) {
        cStart = cStart + key.length + 1;
        let cEnd = document.cookie.indexOf(';', cStart);
        if (cEnd === -1) cEnd = document.cookie.length;
        return unescape(document.cookie.substring(cStart, cEnd));
      }
    }
    return '';
  }

  remove(key: string): void {
    this.set(key, '', -1);
  }
}
