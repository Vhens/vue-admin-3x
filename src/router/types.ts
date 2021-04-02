/*
 * @Author: Vhen
 * @Date: 2021-03-25 09:34:01
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-25 10:12:56
 * @Description: 
 */

import type { RouteRecordRaw } from 'vue-router';
import { defineComponent } from 'vue';

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouteMeta {
  title: string;
  isKeepAlive: boolean,
  isAuth: boolean,
  affix?: boolean;
  icon?: string;
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}


export type AppRouteModule = AppRouteRecordRaw;
