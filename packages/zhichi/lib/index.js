/*!
 * (c) 2014-2020 FE-Team
 * Released under the Apache License.
 */
/*!
 * (c) 2014-2020 FE-Team
 * Released under the Apache License.
 */
/**
 *
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */


function parseQuery(query) {
  query = !query ? window.location.href : query;
  const queryWithoutStart = query.indexOf("?") === 0 ? query.substring(1) : query;
  const uaFormated = {};
  const strs = queryWithoutStart.split("&");

  for (let querySingle in strs) {
    uaFormated[querySingle.split("=")[0]] = unescape(querySingle.split("=")[1]);
  }

  return uaFormated;
}
/**
 *
 * @desc   给要加载的js文件添加属性，比如Tag
 * @return {HTMLScriptElement}
 */


const buildScriptTag = (src, attrs) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.defer = true;
  script.src = src;

  for (let attr in Object.keys(attrs)) {
    script.setAttribute(attr, attrs[attr]);
  }

  return script;
};
/**
 * @desc    异步加载script
 */


function loadScript(url, attrs = {}) {
  const script = buildScriptTag(url, attrs);
  const p = new Promise((resolve, reject) => {
    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject();
    };
  });
  document.body.appendChild(script);
  return p;
}

const uaParsed = navigator ? parseQuery(navigator.userAgent) : {};
/**
 * @desc    系统信息判断获取
 */

const platform = {
  /**
   * 是否为mobile
   */
  mobile: typeof navigator !== 'undefined' && /(Android|iPhone|SymbianOS|Windows\ Phone|iPad|iPod)/i.test(navigator.userAgent),

  /**
   * 是否为ios
   */
  ios: typeof navigator !== 'undefined' && /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),

  /**
   * 是否为android
   */
  android: typeof navigator !== 'undefined' && /(Android)/i.test(navigator.userAgent),

  /**
   * 是否为微信webview
   */
  weixinwebview: typeof navigator !== 'undefined' && /MicroMessenger/i.test(navigator.userAgent),

  /**
   * 是否为微信小程序
   */
  miniprogram: typeof wx !== 'undefined' && typeof wx.getSystemInfo !== 'undefined',

  /**
   * 是否为美术宝一对一app
   */
  msb1v1app: typeof navigator !== 'undefined' && typeof uaParsed.ua !== 'undefined' && (uaParsed.ua.includes('ydy') || uaParsed.ua.includes('vwb'))
};

const webchatGroupidConfig = {
    test: {
        vip: 'c391e14143704d6dab466627216074db',
        user: '8babcc48c586436ca95910514bd45f44',
        noUser: '8babcc48c586436ca95910514bd45f44'
    },
    online: {
        vip: 'b7bc46a1cc574a8f8d928aa15a76c3db',
        user: '90028686d3074163a84e933b5c144113',
        noUser: '90028686d3074163a84e933b5c144113'
    }
};
const isonline = !platform.miniprogram && window.location.hostname === 'vip.meishubao.com';
function generateServiceGroup(userStatus, env) {
    const currentEnv = env ? env : isonline ? 'online' : 'test';
    const groupid = webchatGroupidConfig[currentEnv][userStatus];
    const sysnum = 'fce2741b560141a189049555c54922e8';
    const robotid = userStatus === 'vip' ? 2 : 1;
    return { groupid, sysnum, robotid };
}

// const webchatGroupidConfig: { [key: string]: any } = {
//     test: {
//         vip: 'c391e14143704d6dab466627216074db',
//         user: '8babcc48c586436ca95910514bd45f44',
//         noUser: '8babcc48c586436ca95910514bd45f44'
//     },
//     online: {
//         vip: 'b7bc46a1cc574a8f8d928aa15a76c3db',
//         user: '90028686d3074163a84e933b5c144113',
//         noUser: '90028686d3074163a84e933b5c144113'
//     }
// };
// sysnum 15f8f7e3ff534554a8478e4b4c5576cd
// groupid 86a6fdd8d34147a7b06881665821dee9
// const isonline: boolean = window.location.hostname === 'vip.meishubao.com';
function generateServiceGroup$1(userStatus, env) {
    // const env: string = isonline ? 'online' : 'test';
    // const groupid: string = webchatGroupidConfig[env][userStatus];
    const groupid = '86a6fdd8d34147a7b06881665821dee9';
    const sysnum = '15f8f7e3ff534554a8478e4b4c5576cd';
    return { groupid, sysnum };
}

// 平台类型
var platform$1;
(function (platform) {
    platform[platform["PC"] = 0] = "PC";
    platform[platform["WECHAT"] = 1] = "WECHAT";
    platform[platform["APP"] = 2] = "APP";
    platform[platform["WEB"] = 3] = "WEB";
    platform[platform["MOBILE"] = 4] = "MOBILE";
})(platform$1 || (platform$1 = {}));
const source = platform.weixinwebview
    ? platform$1.WECHAT
    : platform.msb1v1app
        ? platform$1.APP
        : platform.mobile
            ? platform$1.MOBILE
            : platform$1.PC;
function generateServiceIconUi() {
    const chatIconStyle = {
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
function generateServiceGroup$2(product, userStatus, env) {
    if (product === '1v1') {
        return generateServiceGroup(userStatus, env);
    }
    else {
        return generateServiceGroup$1();
    }
}
function initZhichi(config) {
    config.className === undefined && generateServiceIconUi();
    const { groupid, sysnum, robotid } = generateServiceGroup$2(config.product, config.userStatus, config.env);
    let gid = groupid;
    config.groupid && !config.agentid && (gid = config.groupid);
    config.agentid && !config.groupid && (gid = '');
    const attrs = {
        async: true,
        id: 'zhichiScript',
        class: config.className || 'webchat'
    };
    window.zc = function (...args) {
        window.cbk = window.cbk || [];
        window.cbk.push(args);
    };
    loadScript(`https://chat.sobot.com/chat/frame/v2/entrance.js?sysnum=${sysnum}`, attrs);
    const params = {
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
//# sourceMappingURL=index.js.map
