import { loadScript } from '@msb/utils';

export interface JssdkConfigParams {
  /**
   * 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
   */
  debug: boolean;
  /**
   * 必填，公众号的唯一标识
   */
  appId: string;
  /**
   * 必填，生成签名的时间戳
   */
  timestamp: number;
  /**
   * 必填，生成签名的随机串
   */
  nonceStr: string;
  /**
   * 必填，签名
   */
  signature: string;
  /**
   * 必填，需要使用的JS接口列表
   */
  jsApiList: string[];
}

const jssdkUrl = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js';

const jssdkConfig = async (config: JssdkConfigParams) => {
  if (typeof wx === 'undefined') {
    await loadScript(jssdkUrl);
  }
  return new Promise((resolve, reject) => {
    // jssdk配置
    wx.config(config);

    wx.ready(() => {
      resolve();
    });

    wx.error(() => {
      reject('微信jssdk配置失败');
    });
  });
};

export default jssdkConfig;
