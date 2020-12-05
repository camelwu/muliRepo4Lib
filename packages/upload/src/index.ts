import { platform as clientEnv } from '@mrjl/utils';
import { IuploadParams } from './types';

/**
 * @description oss上传(兼容公众号和小程序)，异步加载模式，在rollup中不能实现，改成同步。
 */
/*async function uploadFile(params: IuploadParams) {
  if (clientEnv.miniprogram) {
    const miniprogramUpload = await import('./miniprogram-upload');
    return miniprogramUpload.default(params);
  } else {
    const h5Upload = await import('./h5-upload');
    return h5Upload.default(params);
  }
}
export default uploadFile;
*/

import mUpload from './miniprogram-upload';
import hUpload from './h5-upload';
export { mUpload, hUpload }
export default function(params: IuploadParams){
  if (clientEnv.miniprogram) {
    return mUpload(params);
  } else {
    return hUpload(params);
  }
}