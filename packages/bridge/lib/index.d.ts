interface Bridge {
}
declare type GlobalBridge = Bridge | null;
declare global {
    interface Window {
        WebViewJavascriptBridge: object;
        WVJBCallbacks: (Function)[];
        ampTpl: string;
        linkedFn: Function | undefined;
        jsInterface: {
            invokeMethod: Function;
        };
        RongIMLib: any;
        RongIMClient: any;
        _czc: any;
        _hmt: any;
        meteor: any;
        dataLayer: any;
        gdt: any;
        MtaH5: any;
        zc: (action: string, options: {
            [key: string]: any;
        }) => void;
        cbk: any[];
    }
}
declare const _default: {
    bridge: {
        init: () => void;
        setupWebViewJavascriptBridge: (setupFn: () => {}) => number | void | null;
        getPlatform: () => {
            trident: boolean;
            presto: boolean;
            webKit: boolean;
            gecko: boolean;
            mobile: boolean;
            ios: boolean;
            android: boolean;
            iPhone: boolean;
            iPad: boolean;
            webApp: boolean;
        };
        getBridge: () => GlobalBridge;
    };
};
export default _default;
