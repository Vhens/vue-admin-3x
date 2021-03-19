/*
 * @Author: Vhen
 * @Date: 2021-03-19 10:20:27
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-19 10:21:05
 * @Description:
 */

export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicResult<T extends any> {
  items: T;
  total: number;
}
