import {platform as client, loadScript} from '@mrjl/utils';
import generateOnebyoneServiceGroup from './onebyone';
import generateSmallclassServiceGroup from './smallclass';
import { UserStatus } from './types';

// 注册全局变量
declare global {
  interface Window {
    zc: (action: string, options: { [key: string]: any }) => void;
    cbk: any[];
  }
}
// 平台类型
enum platform {
  PC,
  WECHAT,
  APP,
  WEB,
  MOBILE
}
const source: platform = client.weixinwebview
  ? platform.WECHAT
  : client.msb1v1app
  ? platform.APP
  : client.mobile
  ? platform.MOBILE
  : platform.PC;

function generateServiceIconUi(): void {
  const chatIconStyle: { [key: string]: string } = {
    position: 'fixed',
    'z-index': '99999',
    'box-shadow': 'rgba(15 ,66 ,76 ,0.25) 0px 0px 14px 0px',
    width: '60px',
    height: '60px',
    'border-radius': '50%',
    'background-color': 'rgb(231 ,83 ,73)',
    'background-image': 'url(//www.sobot.com/chat/frame/imgs/icon.png)',
    'background-repeat': 'no-repeat',
    'background-position': '18px -58px',
    right: '20px',
    bottom: '40px',
    cursor: 'pointer'
  };
  const div = document.createElement('div');
  div.className = 'webchat';
  let styleText = '';
  for (const styleFeild in chatIconStyle) {
    styleText += styleFeild + ':' + chatIconStyle[styleFeild] + ';';
  }
  div.style.cssText = styleText;
  document.body.appendChild(div);
}

type Product = '1v1' | 'smallclass';

function generateServiceGroup(
  product: Product,
  userStatus: UserStatus,
  env?: 'online' | 'test'
): { groupid: string; sysnum: string; robotid?: number } {
  if (product === '1v1') {
    return generateOnebyoneServiceGroup(userStatus, env);
  } else {
    return generateSmallclassServiceGroup(userStatus, env);
  }
}

interface ZhichiConfig {
  product: Product; // 产品名称：一对一或小班课
  partnerid: string; // 用户id
  userStatus: UserStatus; // 用户身份
  type?: number; // 客服模式 1: 仅机器人客服模式 2: 仅人工客服模式 3: 机器人客服优先模式 4: 人工客服优先模式
  groupid?: string; // 客服组id
  agentid?: string; // 指定客服接待 客服id
  className?: string; // 咨询按钮类名
  locale?: string; //en: 英文， cn: 简体中文，tw: 繁体中文（默认简体中文）
  anchor?: boolean; // 是否新窗口打开，默认false
  env?: 'online' | 'test'; // 传入环境配置，测试环境或正式环境
  zhichiCustomeSetting?: object;
}

function initZhichi(config: ZhichiConfig): void {
  config.className === undefined && generateServiceIconUi();
  const { groupid, sysnum, robotid } = generateServiceGroup(
    config.product,
    config.userStatus,
    config.env
  );
  let gid: string = groupid;
  config.groupid && !config.agentid && (gid = config.groupid);
  config.agentid && !config.groupid && (gid = '');
  const attrs: { [key: string]: any } = {
    async: true,
    id: 'zhichiScript',
    class: config.className || 'webchat'
  };
  window.zc = function(...args: any) {
    window.cbk = window.cbk || [];
    window.cbk.push(args);
  };
  loadScript(
    `https://chat.sobot.com/chat/frame/v2/entrance.js?sysnum=${sysnum}`,
    attrs
  );

  interface ZhichiParams {
    partnerid?: string;
    source: platform;
  }

  const params: ZhichiParams = {
    source
  };
  config.partnerid && (params.partnerid = config.partnerid);
  window.zc('config', {
    custom: true,
    type: config.type,
    groupid: gid,
    robotid,
    anchor: config.anchor,
    locale: config.locale || 'cn',
    agentid: config.agentid,
    ...params,
    ...config.zhichiCustomeSetting,
    params: JSON.stringify(params)
  });
}

export default initZhichi;
