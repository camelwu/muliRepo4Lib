import { parseQuery } from './parseQuery';
const uaParsed: { [key: string]: string } = navigator ? parseQuery(navigator.userAgent) : {};

/**
 * @desc    系统信息判断获取
 */
export const platform =  {
    /**
     * 是否为mobile
     */
    mobile:
        typeof navigator !== 'undefined' &&
        /(Android|iPhone|SymbianOS|Windows\ Phone|iPad|iPod)/i.test(navigator.userAgent),
    /**
     * 是否为ios
     */
    ios: typeof navigator !== 'undefined' && /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
    /**
     * 是否为android
     */
    android: typeof navigator !== 'undefined' && /(Android)/i.test(navigator.userAgent),
    /**
     * 是否为微信webview
     */
    weixinwebview: typeof navigator !== 'undefined' && /MicroMessenger/i.test(navigator.userAgent),
    /**
     * 是否为微信小程序
     */
    miniprogram: typeof wx !== 'undefined' && typeof wx.getSystemInfo !== 'undefined',
    /**
     * 是否为美术宝一对一app
     */
    msb1v1app:
        typeof navigator !== 'undefined' &&
        typeof uaParsed.ua !== 'undefined' &&
        (uaParsed.ua.includes('ydy') || uaParsed.ua.includes('vwb')),
};
