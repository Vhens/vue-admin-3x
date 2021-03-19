/*
 * @Author: Vhen
 * @Date: 2021-03-17 14:59:25
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-19 09:43:15
 * @Description:
 */
import { AxiosRequestConfig } from 'axios';
export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
}

export interface RequestOptions {
  // 是否显示成功消息
  isShowSuccessMessage?: number;
  // 是否显示错误消息
  isShowErrorMessage?: number;
  // 是否显示加载动画
  isShowLoading?: number;
}
