import { platform } from '@msb/utils';

declare global {
interface Window {
  WebViewJavascriptBridge: object;
  WVJBCallbacks: (Function)[];
  ampTpl: string;
  linkedFn: Function | undefined;
  jsInterface: {
    invokeMethod: Function;
  };
}
}
const globalThis: Window = window || {};
// 挂载全局方法，由原生主动调用
function setupWebViewJavascriptBridge(callback: Function): void {
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
  getUserInfo!: (params: any) => void;
  getLeaveUsers!: (params: any) => void;
  jump2Login!: (params: any) => void;
  shareInfo!: (params: any) => void;
  sendIm!: (params: any) => void;
  linkStudyDetail!: (params: any) => void;
  listStudy!: (params: any) => void;
  listCheck!: (params: any) => void;
  linkCheck!: (params: any) => void;
  lookHeaderImg!: (params: any) => void;
  listRecord!: (params: any) => void;
  listLeave!: (params: any) => void;
  attendanceRecord!: (params: any) => void;
  showBar!: (params: any) => void;
  showShare!: (params: any) => void;
  gotoCustomerService!: (params: any) => void;
  saveImage!: (params: any) => void;
  nextStation!: (params: any) => void;
  web_shareImage!: (params: { platform: number; imgUrl: string }) => void;
  web_statistics!: (params: any) => void;
  startLoading!: (params: any) => void;
  saveImageCallback!: (params: any) => void;
  fullScreen!: (params: any) => void;
  enterTakeAttendance!: (params: any) => void;
  enterTakeOff!: (params: any) => void;
  webClose!: (params: any) => void;
  enterPersonalHomePage!: (params: any) => void;
  saveInfo!: (params: any) => void;
}

function RegisterClientEvents(constructor: any) {
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
    constructor.prototype[event] = function(params: any) {
      const options: any = {
        action: event
      };
      if (typeof params === 'function') {
        options._action = params;
      } else {
        options.params = params;
      }
      this.sendMsg(options);
    };
  }
}

interface Action {
  send: Function;
  init: Function;
  registerHandler: Function;
}
interface Act {
  bridge: Action;
}
interface CallbacksData {
  _action: string;
  data?: object;
}

// jsbridge
@RegisterClientEvents
class Client extends EventsParams {
  public action!: Action;
  private count = 0;
  private fnPool: { [key: string]: Function } = {};
  private bridge: any;
  private bridgeCallbacks: any[] = [];
  constructor() {
    super();
    setupWebViewJavascriptBridge((bridge: any) => {
      this.bridge = bridge;
      if (this.bridgeCallbacks.length !== 0) {
        for (const cbParams of this.bridgeCallbacks) {
          bridge.callHandler(...cbParams);
        }
        this.bridgeCallbacks = [];
      }
    });
  }
  connect(act: Act | string, linkedFn?: Function): void {
    if (platform.ios) {
      if (typeof act === 'object') {
        this.action = act.bridge;
        this.action.init();
        this.action.registerHandler(
          'amapCallWebViewHandler',
          this.amapCallWebViewHandlerCallbacks
        );
        if (globalThis.linkedFn) {
          globalThis.linkedFn();
        }
      } else {
        globalThis.ampTpl = act;
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          (() => {
            this.connect;
          }) as EventListener,
          false
        );
        globalThis.linkedFn = linkedFn;
      }
    } else {
      if (typeof act === 'object') {
        this.action = {
          send(arg: any, params?: string) {
            arg = JSON.stringify(arg);
            if (params) {
              try {
                globalThis.jsInterface.invokeMethod('send', [arg, params]);
              } catch (e) {}
            } else {
              try {
                globalThis.jsInterface.invokeMethod('send', arg);
              } catch (e) {}
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
      } else {
        globalThis.ampTpl = act;
        globalThis.linkedFn = linkedFn;
        document.addEventListener(
          'DOMContentLoaded',
          () => {
            this.connect;
          },
          false
        );
      }
    }
  }
  sendMsg(params: { _action: string }) {
    if (platform.ios) {
      if (this.bridge) {
        this.bridge.callHandler(params._action, params, params._action);
      } else {
        const options = [params._action, params, params._action];
        this.bridgeCallbacks.push(options);
      }
    } else {
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
  amapCallWebViewHandlerCallbacks(res: CallbacksData) {
    try {
      const data = res;
      if (data) {
        const _cbName = data._action;
        if (_cbName) {
          this.fnPool[_cbName].call(null, data.data ? data.data : data);
          delete this.fnPool[_cbName];
        }
      } else {
        throw new Error('未知错误');
      }
    } catch (e) {}
  }
  on(eventName: string, callback: Function) {
    this.fnPool[eventName] = callback;
  }
  invokeEvent(eventName: string, data: object) {
    this.fnPool[eventName].call(null, data);
  }
}

let client: Client | null = null;
if (!platform.miniprogram) {
  client = new Client();
  client.connect('studio');
}

export default client;
