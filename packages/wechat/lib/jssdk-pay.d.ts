export interface IjssdkPayParams {
    appId: string;
    timeStamp: string;
    nonceStr: string;
    package: string;
    signType: 'MD5' | 'HMAC-SHA256';
    paySign: string;
}
declare const _default: (params: IjssdkPayParams) => Promise<unknown>;
/**
 * 发起微信支付(公众号)
 */
export default _default;
