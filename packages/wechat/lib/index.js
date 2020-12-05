/*!
 * (c) 2014-2020 FE-Team
 * Released under the Apache License.
 */
import 'qs';

/**
 * 发起微信支付(公众号)
 */
var jssdkPay = (params) => {
    return new Promise((resolve, reject) => {
        function onBridgeReady() {
            // @ts-ignore
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                appId: params.appId,
                timeStamp: params.timeStamp,
                nonceStr: params.nonceStr,
                package: params.package,
                signType: params.signType,
                paySign: params.paySign //微信签名
            }, function (res) {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    resolve();
                }
                else {
                    reject();
                }
            });
        }
        // @ts-ignore
        if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                // @ts-ignore
            }
            else if (document.attachEvent) {
                // @ts-ignore
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                // @ts-ignore
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }
        else {
            onBridgeReady();
        }
    });
};

/**
 * 发起微信支付(小程序)
 */
var miniprogramPay = (params) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            timeStamp: params.timeStamp,
            nonceStr: params.nonceStr,
            package: params.package,
            signType: params.signType,
            paySign: params.paySign,
            success: function () {
                resolve();
            },
            fail: function () {
                reject();
            }
        });
    });
};

/*!
 * (c) 2014-2020 FE-Team
 * Released under the Apache License.
 */
/**
 *
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */


function parseQuery(query) {
  query = !query ? window.location.href : query;
  const queryWithoutStart = query.indexOf("?") === 0 ? query.substring(1) : query;
  const uaFormated = {};
  const strs = queryWithoutStart.split("&");

  for (let querySingle in strs) {
    uaFormated[querySingle.split("=")[0]] = unescape(querySingle.split("=")[1]);
  }

  return uaFormated;
}

const uaParsed = navigator ? parseQuery(navigator.userAgent) : {};
/**
 * @desc    系统信息判断获取
 */

const platform = {
  /**
   * 是否为mobile
   */
  mobile: typeof navigator !== 'undefined' && /(Android|iPhone|SymbianOS|Windows\ Phone|iPad|iPod)/i.test(navigator.userAgent),

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
  msb1v1app: typeof navigator !== 'undefined' && typeof uaParsed.ua !== 'undefined' && (uaParsed.ua.includes('ydy') || uaParsed.ua.includes('vwb'))
};

const weixinPay = (params) => {
    if (platform.miniprogram) {
        return miniprogramPay(params);
    }
    else if (platform.weixinwebview) {
        return jssdkPay(params);
    }
    else {
        throw new Error('weixin-pay: environment does not support');
    }
};

export default weixinPay;
//# sourceMappingURL=index.js.map
