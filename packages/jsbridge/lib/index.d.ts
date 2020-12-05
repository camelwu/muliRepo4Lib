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
declare class EventsParams {
    getUserInfo: (params: any) => void;
    getLeaveUsers: (params: any) => void;
    jump2Login: (params: any) => void;
    shareInfo: (params: any) => void;
    sendIm: (params: any) => void;
    linkStudyDetail: (params: any) => void;
    listStudy: (params: any) => void;
    listCheck: (params: any) => void;
    linkCheck: (params: any) => void;
    lookHeaderImg: (params: any) => void;
    listRecord: (params: any) => void;
    listLeave: (params: any) => void;
    attendanceRecord: (params: any) => void;
    showBar: (params: any) => void;
    showShare: (params: any) => void;
    gotoCustomerService: (params: any) => void;
    saveImage: (params: any) => void;
    nextStation: (params: any) => void;
    web_shareImage: (params: {
        platform: number;
        imgUrl: string;
    }) => void;
    web_statistics: (params: any) => void;
    startLoading: (params: any) => void;
    saveImageCallback: (params: any) => void;
    fullScreen: (params: any) => void;
    enterTakeAttendance: (params: any) => void;
    enterTakeOff: (params: any) => void;
    webClose: (params: any) => void;
    enterPersonalHomePage: (params: any) => void;
    saveInfo: (params: any) => void;
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
declare class Client extends EventsParams {
    action: Action;
    private count;
    private fnPool;
    private bridge;
    private bridgeCallbacks;
    constructor();
    connect(act: Act | string, linkedFn?: Function): void;
    sendMsg(params: {
        _action: string;
    }): void;
    amapCallWebViewHandlerCallbacks(res: CallbacksData): void;
    on(eventName: string, callback: Function): void;
    invokeEvent(eventName: string, data: object): void;
}
declare let client: Client | null;
export default client;
