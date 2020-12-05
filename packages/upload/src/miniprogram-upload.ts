import { IuploadParams, IuploadReturn } from './types';
const config = {
  cdnServerURL: `https://cdn.be-member.com/` //默认存在根目录，可根据需求改
};

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

// 参数一：文件路径 参数二： 要上传的oss文件夹名称
const uploadFile = function(params: IuploadParams) {
  if (Object.prototype.toString.call(params.file) !== '[object String]') {
    throw new Error('请填写字符串类型参数');
  }
  const aliyunFileKey = `${params.fileW}/${params.file.replace(
    'http://tmp/',
    ''
  )}`;
  function getOsssign() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://youdomain/api/getosssign',
        method: 'POST',
        success(res: SuccessRes) {
          resolve(res.data);
        },
        fail() {
          reject('请求失败');
        }
      });
    });
  }
  const cdnServerURL = config.cdnServerURL;
  return new Promise<IuploadReturn>(async (resolve, reject) => {
    const data: any = await getOsssign();
    wx.uploadFile({
      url: cdnServerURL,
      filePath: params.file,
      name: 'file',
      formData: {
        key: aliyunFileKey,
        OSSAccessKeyId: data.accessid,
        policy: data.policy,
        Signature: data.signature,
        ['success_action_status']: '200'
      },
      success: function(res) {
        if (res.statusCode !== 200) {
          reject({
            res: res,
            url: cdnServerURL + aliyunFileKey
          });
          return;
        } else {
          resolve({
            data: res,
            url: cdnServerURL + aliyunFileKey
          });
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
};
export default uploadFile;
