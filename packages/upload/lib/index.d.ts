import { IuploadParams } from './types';
/**
 * @description oss上传(兼容公众号和小程序)，异步加载模式，在rollup中不能实现，改成同步。
 */
import mUpload from './miniprogram-upload';
import hUpload from './h5-upload';
export { mUpload, hUpload };
export default function (params: IuploadParams): Promise<import("./types").IuploadReturn>;
