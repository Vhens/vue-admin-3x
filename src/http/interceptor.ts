/*
 * @Author: Vhen
 * @Date: 2021-03-10 13:23:05
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-19 10:06:49
 * @Description: 二次封装axios
 */
import type { AxiosInstance, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';
import axios from 'axios';
import { checkStatus } from './checkStatus'
import { axiosCanceler } from './axiosCancel'
import { CustomRequestOptions } from '@/enums/httpEnum';
import type { CreateAxiosOptions } from './types';

import Operator from './operator'

export class Interceptors {
  private axiosInstance: AxiosInstance;
  private loadingInstance :any
  // private options: CreateAxiosOptions;
  constructor(config: CreateAxiosOptions) {
    // 设置默认config
    this.axiosInstance = axios.create(config);
    this.setupInterceptors(this.axiosInstance);
  }
  /**
   * 修改默认配置
   * Create axios instance
   * @param config
   */
  public createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  /**
   * 修改axios中headers
   * @description: Set general header
   */
   public setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }
  /**
   * 初始化拦截器
   * @description: Interceptor configuration
   */
  private setupInterceptors(axiosInstance: AxiosInstance):void {
    /**
     * 请求拦截器
     */
    axiosInstance.interceptors.request.use((config: CreateAxiosOptions) => {
      
      axiosCanceler.addPending(config)
      if (
        process.env.NODE_ENV !== "production"
      ) {
        config.url = new Operator(config.url).url;
      } else {
        config.url = config.url;
      }
      // 是否需要显示加载动画
      if (config.requestOptions?.isShowLoading === CustomRequestOptions.SHOW_SUCCESS_MESSAGE) {
        this.loadingInstance =ElLoading.service({
          // target: '#app', //Loading 需要覆盖的 DOM 节点
          text: '正在加载中......', // 显示在加载图标下方的加载文案
          background: 'rgba(0, 0, 0, 0.8)', // 遮罩背景色
        });
      }
 
      return config
    }, error => {
        console.error(error);
    });
    /**
     *  响应拦截器
     */
    axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      axiosCanceler.removePending(response.config);
      if (this.loadingInstance) {
        this.loadingInstance.close()
      }
      return response
    }, error => {
      const response: any = error.response;
      if (response) {
        const message= checkStatus(response.status,response)
        console.error(message);
      }  
    })
  }
  /**
   *  get请求
   * @param url 
   * @param data 
   */
   protected  async get<T, S>(url: string, data: T): Promise<S | string> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(url, {
          params: data,
        })
        .then((res: any) => {
 
         resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  /**
   * post请求
 
  * @param url 
   * @param data 
   */
   protected  async post<T, S>(url: string, data: T,headers:any): Promise<S | string> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(url, data,headers)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {     
          reject(error);
        });
    });
  }

  /**
   * delete请求
   * @param url 
   * @param data 
   */
   protected  async delete<T, S>(url: string, data: T): Promise<S | string> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .delete(url, {
          params: data,
        })
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {   
          reject(error);
        });
    });
   }
  
  /**
   * put请求
   * @param url 
   * @param data 
   */
   protected  async put<T, S>(url: string, data: T): Promise<S | string> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put(url, data)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {   
          reject(error);
        });
    });
  }
}

