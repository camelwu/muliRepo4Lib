import { IuploadParams, IuploadReturn } from './types';
import { platform as clientEnv, convertBase64UrlToBlob } from '@mrjl/utils';

import OSS from 'ali-oss';

let client: any = null;
if (!clientEnv.miniprogram) {
  client = new OSS({
    region: 'oss-cn-beijing',
    secure: true,
    endpoint: 'xx.aliyuncs.com',
    accessKeyId: '', // 16位字符
    accessKeySecret: '', // 30位字符
    bucket: 'bucket'
  });
}

const uploadFile = function(params: IuploadParams) {
  let newFile: File | Blob;
  if (
    typeof params.file === 'string' &&
    params.file.indexOf('data:image/') > -1
  ) {
    newFile = convertBase64UrlToBlob(params.file);
  } else {
    newFile = params.file;
  }
  const uploadPath = (path: any, file: any) => {
    return `${path}/${Date.now()}${(Math.random() * 10000).toFixed(0)}${
      file.name
    }`;
  };
  const ossPath = uploadPath(params.fileW, newFile);
  return new Promise<IuploadReturn>((resolve, reject) => {
    client
      .multipartUpload(ossPath, newFile, {})
      .then(function(result: any) {
        const imgUrl = result.res.requestUrls[0].split('?')[0];
        const returnUrl = imgUrl.replace(
          /oss-cn-hangzhou.aliyuncs/g,
          'imgvip'
        );
        resolve({
          url: returnUrl
        });
      })
      .catch(function(err: any) {
        reject(err);
      });
  });
};

export default uploadFile;
