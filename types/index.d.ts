
interface Window {
    WebViewJavascriptBridge: object;
    WVJBCallbacks: (Function)[];
    ampTpl: string;
    linkedFn: Function | undefined;
    jsInterface: {
        invokeMethod: Function;
    };
    // WVJBCallbacks: any[];
    RongIMLib: any;
    RongIMClient: any;
    _czc: any;
    _hmt: any;
    meteor: any;
    dataLayer: any;
    gdt: any;
    MtaH5: any;
    zc: (action: string, options: { [key: string]: any }) => void;
    cbk: any[];
}
