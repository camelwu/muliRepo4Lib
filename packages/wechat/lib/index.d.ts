import { IjssdkPayParams } from './jssdk-pay';
import { IminiprogramPayParams } from './miniprogram-pay';
declare const weixinPay: (params: IjssdkPayParams | IminiprogramPayParams) => Promise<unknown>;
export default weixinPay;
export * from './jssdk-login';
export * from './jssdk-share';
