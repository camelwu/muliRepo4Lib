import { stringify } from 'qs';

export interface IjssdkLoginParams {
  /**
   * 微信公众号appid
   */
  appId: string;
  /**
   * 后端登录api接口
   */
  api: string;
  /**
   * 登录后重定向的url
   */
  redirect?: string;
}

/**
 * 微信登录(公众号)
 */
const jssdkLogin = ({ appId = '', api = '', redirect = location.href }) => {
  const goUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';

  const redirectUri = encodeURIComponent(`${api}?redirectUrl='+${redirect}`);
  const params = {
    appid: appId,
    ['redirect_uri']: redirectUri,
    ['response_type']: 'code',
    scope: 'snsapi_base',
    state: 'STATE'
  };

  location.replace(`${goUrl} +'?${stringify(params)}#wechat_redirect'`);
};

export default jssdkLogin;
