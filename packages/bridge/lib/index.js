/*!
 * (c) 2014-2020 FE-Team
 * Released under the Apache License.
 */
let globalBridge = null;
const init = () => { };
const getBridge = () => globalBridge;
/**
 * 拦截 bridge 对象
 *
 * @param {*} callback
 * @returns
 */
const setupHooks = (callback) => {
    return (jsBridge) => {
        globalBridge = jsBridge;
        if (callback) {
            return callback(globalBridge);
        }
        return null;
    };
};
/**
 * 开始启动bridge
 *
 * @param {*} setupFn
 * @returns
 */
const setupWebViewJavascriptBridge = (setupFn) => {
    const callback = setupHooks(setupFn);
    // electron 是preload也就是加载前注入，这里应该始终存在，为了防止以为 electron 需要响应备选请求
    if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    // 兼容IOS，注入时间后延，防止出现不执行的情况
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
        document.documentElement.removeChild(WVJBIframe);
    }, 0);
    return null;
};
const getPlatform = () => {
    const u = navigator.userAgent;
    return {
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1,
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
        iPad: u.indexOf('iPad') > -1,
        webApp: u.indexOf('Safari') === -1,
    };
};
var index = {
    bridge: {
        init,
        setupWebViewJavascriptBridge,
        getPlatform,
        getBridge,
    },
};

export default index;
//# sourceMappingURL=index.js.map
