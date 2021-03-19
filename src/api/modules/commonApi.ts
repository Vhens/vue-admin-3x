/*
 * @Author: Vhen
 * @Date: 2021-03-19 10:21:49
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-19 10:37:39
 * @Description:
 */

import { http } from '@/http';

enum Api {
  GetImgConfigureList = 'api-announcement/imgConfigure/getImgConfigureList',
}

class Common {
  constructor() {}
  public getImgConfigureList(): void {
    return http.post(Api.GetImgConfigureList);
  }
}

export const CommonApi = new Common();
