/*
 * @Author: Vhen
 * @Date: 2021-03-25 10:12:17
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-25 10:18:44
 * @Description: 
 */

declare function parseInt(s: string | number, radix?: number): number;

declare function parseFloat(string: string | number): number;


declare type Recordable<T extends any = any> = Record<string, T>;

declare type ReadonlyRecordable<T extends any = any> = {
  readonly [key: string]: T;
};
