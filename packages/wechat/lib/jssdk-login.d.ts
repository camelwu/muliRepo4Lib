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
declare const jssdkLogin: ({ appId, api, redirect }: {
    appId?: string | undefined;
    api?: string | undefined;
    redirect?: string | undefined;
}) => void;
export default jssdkLogin;
