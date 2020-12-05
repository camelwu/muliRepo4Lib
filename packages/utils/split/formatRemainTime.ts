/**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
export function formatRemainTime(endTime: Date): string {
    const startDate = new Date(); // 开始时间
    const endDate = new Date(endTime); // 结束时间
    const t = endDate.getTime() - startDate.getTime(); // 时间差
    let d = 0;
    let h = 0;
    let m = 0;
    let s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor((t / 1000 / 60 / 60) % 24);
        m = Math.floor((t / 1000 / 60) % 60);
        s = Math.floor((t / 1000) % 60);
    }
    return `${d}天 ${h}小时 ${m}分钟 ${s}秒`;
}

/**
 *
 * @desc 是否为闰年
 * @param {Number} year
 * @return {Boolean}
 */
export function isLeapYear(year: number): boolean {
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        return true;
    }
    return false;
}

/**
 * @desc   判断是否为同一天
 * @param  {Date} date1
 * @param  {Date} date2 可选／默认值：当天
 * @return {Boolean}
 */
export function isSameDay(date1: Date, date2: Date): boolean {
    if (!date2) {
        date2 = new Date();
    }
    const date1_year = date1.getFullYear();
    const date1_month = date1.getMonth() + 1;
    const date1_date = date1.getDate();
    const date2_year = date2.getFullYear();
    const date2_month = date2.getMonth() + 1;
    const date2_date = date2.getDate();

    return (
        date1_date === date2_date &&
        date1_month === date2_month &&
        date1_year === date2_year
    );
}

/**
 * @desc 获取指定日期月份的总天数
 * @param {Date} time
 * @return {Number}
 */
export function monthDays(date: Date): number {
    const time = new Date(date);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    return new Date(year, month, 0).getDate();
}

/**
 * @desc ${startTime - endTime}的剩余时间,startTime大于endTime时，均返回0
 * @param { Date | String } startTime
 * @param { Date | String } endTime
 * @return { Object } { d, h, m, s } 天 时 分 秒
 */
export function timeLeft(
    startTime: Date | string,
    endTime: Date | string
): boolean | { d: number; h: number; m: number; s: number } {
    if (!startTime || !endTime) {
        return false;
    }
    let startDate;
    let endDate;
    if (startTime instanceof Date) {
        startDate = startTime;
    } else {
        startDate = new Date(startTime.replace(/-/g, "/")); // 开始时间
    }
    if (endTime instanceof Date) {
        endDate = endTime;
    } else {
        endDate = new Date(endTime.replace(/-/g, "/")); // 结束时间
    }
    const t = endDate.getTime() - startDate.getTime();
    let d = 0;
    let h = 0;
    let m = 0;
    let s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor((t / 1000 / 60 / 60) % 24);
        m = Math.floor((t / 1000 / 60) % 60);
        s = Math.floor((t / 1000) % 60);
    }
    return { d, h, m, s };
}

/**
 *
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */
export function parseQuery(query: string): { [key: string]: string } {
    query = !query ? window.location.href : query;
    const queryWithoutStart: string =
        query.indexOf("?") === 0 ? query.substring(1) : query;
    const uaFormated: { [key: string]: string } = {};
    const strs: string[] = queryWithoutStart.split("&");
    for (let querySingle in strs) {
        uaFormated[querySingle.split("=")[0]] = unescape(querySingle.split("=")[1]);
    }
    return uaFormated;
}

/**
 *
 * @desc   对象序列化
 * @param  {Object} obj
 * @return {String}
 */
export function stringfyQueryString(obj: { [propName: string]: any }): string {
    if (!obj) return "";
    const pairs: string[] = [];

    for (const key in obj) {
        const value = obj[key];

        if (value instanceof Array) {
            for (let i = 0; i < value.length; ++i) {
                pairs.push(
                    `${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(
                        value[i]
                    )}`
                );
            }
            continue;
        }

        pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }

    return pairs.join("&");
}

/**
 * @description base64转blob
 * @param urlData base64编码
 */
export function convertBase64UrlToBlob(urlData: any) {
    const arr = urlData.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

/**
 *
 * @desc   获取UUID
 * @return {String}
 */
export function getUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 *
 * @desc   获取浏览器信息
 * @return  {Object} obj
 * @return {String}
 */
export function getBrowser(): {
    Sys: { name: string; ver: string };
    info: string;
} {
    const Sys = { name: "", ver: "" };
    const ua = navigator.userAgent.toLowerCase();
    const re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
    const m = ua.match(re);
    if (!m) {
        return {
            Sys: {
                name: "",
                ver: ""
            },
            info: ""
        };
    }
    Sys.name = m[1].replace(/version/, "safari");
    Sys.ver = m[2];
    return { Sys, info: ua };
}

/**
 *
 * @desc   获取系统名称和版本号
 * @return {String} example: mac68k win7
 */
export function checkOS() {
    const sUserAgent = navigator.userAgent.toLowerCase();
    const sPlatform = navigator.platform.toLowerCase();
    const isWin = sPlatform === "win32" || sPlatform === "windows";
    const isMac =
        sPlatform === "mac68k" ||
        sPlatform === "macppc" ||
        sPlatform === "macintosh" ||
        sPlatform === "macintel";
    const isUnix = sPlatform === "x11" && !isWin && !isMac;
    const isLinux = String(sPlatform).indexOf("linux") > -1;
    if (isMac) return "MAC";
    if (isUnix) return "Unix";
    if (isLinux) return "Linux";
    if (isWin) {
        const isWin2K =
            sUserAgent.indexOf("windows nt 5.0") > -1 ||
            sUserAgent.indexOf("windows 2000") > -1;
        if (isWin2K) return "Win2000";
        const isWinXP =
            sUserAgent.indexOf("windows nt 5.1") > -1 ||
            sUserAgent.indexOf("windows xp") > -1;
        if (isWinXP) return "WinXP";
        const isWin2003 =
            sUserAgent.indexOf("windows nt 5.2") > -1 ||
            sUserAgent.indexOf("windows 2003") > -1;
        if (isWin2003) return "Win2003";
        const isWinVista =
            sUserAgent.indexOf("windows nt 6.0") > -1 ||
            sUserAgent.indexOf("windows vista") > -1;
        if (isWinVista) return "WinVista";
        const isWin7 =
            sUserAgent.indexOf("windows nt 6.1") > -1 ||
            sUserAgent.indexOf("windows 7") > -1;
        if (isWin7) return "Win7";
        const isWin8 =
            sUserAgent.indexOf("windows nt 6.2") > -1 ||
            sUserAgent.indexOf("windows nt 6.3") > -1 ||
            sUserAgent.indexOf("windows 8") > -1;
        if (isWin8) return "Win8";
        const isWin10 =
            sUserAgent.indexOf("windows nt 10") > -1 ||
            sUserAgent.indexOf("windows 10") > -1;
        if (isWin10) return "Win10";
    }
    return "other";
}

/**
 *
 * @desc   字符串转对象
 * @param  {Any} objString
 * @return {Object | Json}
 */
export function parse(objString: any) {
    let resultObj = null; // 目标对象
    try {
        resultObj = new Function(`return ${objString}`)();
    } catch (e) {
        console.log(e, "字符串转对象失败");
        resultObj = null;
    }
    return resultObj;
}

/**
 *
 * @desc   从sessionStorage获取UserId，如无根据ISO时间戳生成
 * @return {String}
 */
export function getUserId() {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
        return userId;
    }
    const temp: any = (Date.parse(new Date().toISOString()) % 100000000) / 1000;
    const userIdTemp = `${Number.parseInt(temp)}`;
    sessionStorage.setItem("userId", userIdTemp);
    return userIdTemp;
}

/**
 *
 * @desc   获取Mac系统版本
 * @return {String}
 */
export function getMacOsVersion() {
    return navigator.userAgent.substr(
        navigator.userAgent.indexOf("OS X") + 5,
        navigator.userAgent
            .substr(navigator.userAgent.indexOf("OS X") + 5)
            .indexOf(")")
    );
}

/**
 *
 * @desc   给要加载的js文件添加属性，比如Tag
 * @return {HTMLScriptElement}
 */
const buildScriptTag = (src: string, attrs: { [key: string]: string }) => {
    const script: HTMLScriptElement = document.createElement('script');
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
export function loadScript(url: string, attrs: { [key: string]: string } = {}): Promise<unknown> {
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
};

const uaParsed: { [key: string]: string } = navigator ? parseQuery(navigator.userAgent) : {};

/**
 * @desc    系统信息判断获取
 */
export const platform =  {
    /**
     * 是否为mobile
     */
    mobile:
        typeof navigator !== 'undefined' &&
        /(Android|iPhone|SymbianOS|Windows\ Phone|iPad|iPod)/i.test(navigator.userAgent),
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
     * 是否为一对一app
     */
    msb1v1app:
        typeof navigator !== 'undefined' &&
        typeof uaParsed.ua !== 'undefined' &&
        (uaParsed.ua.includes('ydy') || uaParsed.ua.includes('vwb')),
};
