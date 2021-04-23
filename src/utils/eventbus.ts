/*
 * @Author: Vhen
 * @Date: 2021-04-22 13:20:59
 * @LastEditors: Vhen
 * @LastEditTime: 2021-04-22 13:28:49
 * @Description:
 */
import mitt, { Emitter } from 'mitt';

const bus: any = {};

const emitter: Emitter = mitt();

bus.$on = emitter.on;
bus.$off = emitter.off;
bus.$emit = emitter.emit;

export default bus;
