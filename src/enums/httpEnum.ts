/*
 * @Author: Vhen
 * @Date: 2021-03-03 16:28:59
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-19 10:10:01
 * @Description: http 枚举
 */

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/**
 * 自定义axios配置属性
 * @description:
 */
export enum CustomRequestOptions {
  // 显示请求成功信息
  SHOW_SUCCESS_MESSAGE = 1,
  // 隐藏请求成功信息
  HIDE_SUCCESS_MESSAGE = 0,
  // 显示请求错误信息
  SHOW_ERROR_MESSAGE = 1,
  // 隐藏请求错误信息
  HIDE_ERROR_MESSAGE = 0,
  // 显示加载loading
  SHOW_LOADING = 1,
  // 隐藏加载loading
  HIDE_LOADING = 2,
}
