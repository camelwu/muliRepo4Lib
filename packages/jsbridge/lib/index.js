/*!
 * (c) 2014-2020 FE-Team
 * Released under the Apache License.
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

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
   * 是否为一对一app
   */
  msb1v1app: typeof navigator !== 'undefined' && typeof uaParsed.ua !== 'undefined' && (uaParsed.ua.includes('ydy') || uaParsed.ua.includes('vwb'))
};

const globalThis = window || {};
// 挂载全局方法，由原生主动调用
function setupWebViewJavascriptBridge(callback) {
    if (globalThis.WebViewJavascriptBridge) {
        callback(globalThis.WebViewJavascriptBridge);
    }
    if (globalThis.WVJBCallbacks) {
        globalThis.WVJBCallbacks.push(callback);
    }
    globalThis.WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    // WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
        document.documentElement.removeChild(WVJBIframe);
    }, 0);
}
class EventsParams {
}
function RegisterClientEvents(constructor) {
    const eventsName = [
        'getUserInfo',
        'getLeaveUsers',
        'jump2Login',
        'shareInfo',
        'sendIm',
        'linkStudyDetail',
        'listStudy',
        'listCheck',
        'linkCheck',
        'lookHeaderImg',
        'listRecord',
        'listLeave',
        'attendanceRecord',
        'showBar',
        'showShare',
        'gotoCustomerService',
        'saveImage',
        'nextStation',
        'web_shareImage',
        'web_statistics',
        'startLoading',
        'saveImageCallback',
        'fullScreen',
        'enterTakeAttendance',
        'enterTakeOff',
        'webClose',
        'enterPersonalHomePage',
        'saveInfo'
    ];
    for (const event of eventsName) {
        constructor.prototype[event] = function (params) {
            const options = {
                action: event
            };
            if (typeof params === 'function') {
                options._action = params;
            }
            else {
                options.params = params;
            }
            this.sendMsg(options);
        };
    }
}
// jsbridge
let Client = class Client extends EventsParams {
    constructor() {
        super();
        this.count = 0;
        this.fnPool = {};
        this.bridgeCallbacks = [];
        setupWebViewJavascriptBridge((bridge) => {
            this.bridge = bridge;
            if (this.bridgeCallbacks.length !== 0) {
                for (const cbParams of this.bridgeCallbacks) {
                    bridge.callHandler(...cbParams);
                }
                this.bridgeCallbacks = [];
            }
        });
    }
    connect(act, linkedFn) {
        if (platform.ios) {
            if (typeof act === 'object') {
                this.action = act.bridge;
                this.action.init();
                this.action.registerHandler('amapCallWebViewHandler', this.amapCallWebViewHandlerCallbacks);
                if (globalThis.linkedFn) {
                    globalThis.linkedFn();
                }
            }
            else {
                globalThis.ampTpl = act;
                document.addEventListener('WebViewJavascriptBridgeReady', (() => {
                    this.connect;
                }), false);
                globalThis.linkedFn = linkedFn;
            }
        }
        else {
            if (typeof act === 'object') {
                this.action = {
                    send(arg, params) {
                        arg = JSON.stringify(arg);
                        if (params) {
                            try {
                                globalThis.jsInterface.invokeMethod('send', [arg, params]);
                            }
                            catch (e) { }
                        }
                        else {
                            try {
                                globalThis.jsInterface.invokeMethod('send', arg);
                            }
                            catch (e) { }
                        }
                    },
                    init() {
                        return false;
                    },
                    registerHandler() {
                        return false;
                    }
                };
                typeof globalThis.linkedFn !== 'undefined' && globalThis.linkedFn();
            }
            else {
                globalThis.ampTpl = act;
                globalThis.linkedFn = linkedFn;
                document.addEventListener('DOMContentLoaded', () => {
                    this.connect;
                }, false);
            }
        }
    }
    sendMsg(params) {
        if (platform.ios) {
            if (this.bridge) {
                this.bridge.callHandler(params._action, params, params._action);
            }
            else {
                const options = [params._action, params, params._action];
                this.bridgeCallbacks.push(options);
            }
        }
        else {
            const _action = params._action;
            if (_action) {
                if (typeof _action === 'function') {
                    const _cbName = '_action' + this.count++;
                    this.on(_cbName, _action);
                    params._action = _cbName;
                }
            }
            this.action.send(params);
        }
    }
    amapCallWebViewHandlerCallbacks(res) {
        try {
            const data = res;
            if (data) {
                const _cbName = data._action;
                if (_cbName) {
                    this.fnPool[_cbName].call(null, data.data ? data.data : data);
                    delete this.fnPool[_cbName];
                }
            }
            else {
                throw new Error('未知错误');
            }
        }
        catch (e) { }
    }
    on(eventName, callback) {
        this.fnPool[eventName] = callback;
    }
    invokeEvent(eventName, data) {
        this.fnPool[eventName].call(null, data);
    }
};
Client = __decorate([
    RegisterClientEvents
], Client);
let client = null;
if (!platform.miniprogram) {
    client = new Client();
    client.connect('studio');
}
var client$1 = client;

export default client$1;
//# sourceMappingURL=index.js.map
