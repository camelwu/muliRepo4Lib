import { IuploadParams, IuploadReturn } from './types';
export interface SuccessRes {
    /** 回调函数返回的内容 */
    data: {
        accessid: string;
        host: string;
        policy: string;
        signature: string;
        expire: number;
        url: string;
        dir: string;
    };
    /** 开发者服务器返回的 HTTP 状态码 */
    statusCode: number;
    /** 开发者服务器返回的 HTTP Response Header */
    header: object;
}
declare const uploadFile: (params: IuploadParams) => Promise<IuploadReturn>;
export default uploadFile;
