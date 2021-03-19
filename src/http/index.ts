/*
 * @Author: Vhen
 * @Date: 2021-03-05 13:40:14
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-19 09:42:13
 * @Description: axios 基础配置
 */
import { Interceptors } from './interceptor';
import { ContentTypeEnum, CustomRequestOptions } from '@/enums/httpEnum';

class HttpServer {
  public axios: any;
  constructor() {
    // 获取axios实例
    this.axios = new Interceptors({
      baseURL: '',
      requestOptions: {
        isShowSuccessMessage: CustomRequestOptions.SHOW_SUCCESS_MESSAGE,
        isShowErrorMessage: CustomRequestOptions.SHOW_ERROR_MESSAGE,
        isShowLoading: CustomRequestOptions.SHOW_LOADING,
      },
      timeout: 5000,
      // 是否跨站点访问控制请求,如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
      // withCredentials: true,
      headers: {
        get: {
          'Content-Type': ContentTypeEnum.FORM_URLENCODED,
        },
        post: {
          'Content-Type': ContentTypeEnum.JSON,
        },
      },
    });
    this.initHttpServer();
  }
  /**
   * 初始axios配置
   */
  private initHttpServer(): void {
    this.axios.setHeader({
      token: '9999',
    });
  }
}

export const http = new HttpServer().axios;
