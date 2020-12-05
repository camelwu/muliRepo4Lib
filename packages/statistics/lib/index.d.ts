interface ExampleParams {
    type: 'baidu' | 'GA' | 'gdt' | 'toutiao' | 'youmeng' | 'mta';
    id: string;
    cid?: string;
}
declare global {
    interface Window {
        _czc: any;
        _hmt: any;
        meteor: any;
        dataLayer: any;
        gdt: any;
        MtaH5: any;
    }
}
declare const _default: (params: ExampleParams) => any;
export default _default;
