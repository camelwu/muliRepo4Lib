export interface IminiprogramPayParams {
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: 'MD5' | 'HMAC-SHA256';
  paySign: string;
}

/**
 * 发起微信支付(小程序)
 */
export default (params: IminiprogramPayParams) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success: function() {
        resolve();
      },
      fail: function() {
        reject();
      }
    });
  });
};
