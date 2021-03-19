/*
 * @Author: Vhen
 * @Date: 2021-03-08 10:50:55
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-15 14:01:23
 * @Description: http 请求状态码
 */

export const checkStatus = (status: number, response: any) => {
  let message = '';
  switch (status) {
    case 200:
      message = '服务器成功返回请求的数据(200)';
      break;
    case 201:
      message = '新建或修改数据成功(201)';
      break;
    case 202:
      message = '一个请求已经进入后台排队(202)';
      break;
    case 204:
      message = '删除数据成功(204)';
      break;
    case 400:
      message = '请求错误(400)';
      break;
    case 401:
      message = '未授权，请重新登录(401)';
      break;
    case 403:
      message = '拒绝访问(403)';
      break;
    case 404:
      message = `请求地址出错(404): ${response.config.url}`;
      break;
    case 405:
      message = '请求方法未允许(405)';
      break;
    case 406:
      message = '请求的格式不可得(406)';
      break;
    case 408:
      message = '请求超时(408)';
      break;
    case 410:
      message = '请求的资源被永久删除，且不会再得到的(410)';
      break;
    case 422:
      message = '当创建一个对象时，发生一个验证错误(422)';
      break;
    case 500:
      message = '服务器发生错误，请检查服务器(500)';
      break;
    case 501:
      message = '服务未实现(501)';
      break;
    case 502:
      message = '网络错误(502)';
      break;
    case 503:
      message = '服务不可用，服务器暂时过载或维护(503)';
      break;
    case 504:
      message = '网络超时(504)';
      break;
    case 505:
      message = 'http版本不支持该请求(505)';
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return `${message}，请检查网络或联系管理员！`;
};
