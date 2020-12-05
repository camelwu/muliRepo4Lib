import jssdkPay, { IjssdkPayParams } from './jssdk-pay';
import miniprogramPay, {
  IminiprogramPayParams
} from './miniprogram-pay';
import { platform } from '@msb/utils';
import jssdkLogin from './jssdk-login';

const weixinPay = (params: IjssdkPayParams | IminiprogramPayParams) => {
  if (platform.miniprogram) {
    return miniprogramPay(params);
  } else if (platform.weixinwebview) {
    return jssdkPay(params as IjssdkPayParams);
  } else {
    throw new Error('weixin-pay: environment does not support');
  }
};

export default weixinPay;
export * from './jssdk-login';
export * from './jssdk-share';