/*
 * @Author: Vhen
 * @Date: 2021-03-18 17:00:08
 * @LastEditors: Vhen
 * @LastEditTime: 2021-03-19 10:31:11
 * @Description: 连接后台人员本地服务接口配置
 */
class Operator {
  public url: any;
  private service: any;
  constructor(url: any) {
    this.url = url;
    this.service = [
      {
        key: 'api-announcement',
        value: '',
      },
    ];
    this.serviceAddOperator();
  }
  /**
   * 服务接口添加后台操作人员
   */
  private serviceAddOperator(): void {
    let serviceArr = this.service.filter((v: any) => this.url.indexOf(v.key) >= 0)[0];
    if (serviceArr) {
      let service = serviceArr.key;
      let operator = serviceArr.value;
      let urlArr = this.url.split('/');
      urlArr[0] = `${service}${operator ? '-' : ''}${operator}`;
      this.url = urlArr.join('/');
    }
  }
}

export default Operator;
