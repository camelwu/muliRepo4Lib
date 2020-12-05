export interface IminiprogramPayParams {
    timeStamp: string;
    nonceStr: string;
    package: string;
    signType: 'MD5' | 'HMAC-SHA256';
    paySign: string;
}
declare const _default: (params: IminiprogramPayParams) => Promise<unknown>;
/**
 * 发起微信支付(小程序)
 */
export default _default;
