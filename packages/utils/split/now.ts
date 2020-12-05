/**
 *
 * @desc 判断两个数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 */
export function arrayEqual(arr1: Array<any>, arr2: Array<any>): boolean {
    if (arr1 === arr2) return true;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

/**
 *
 * @desc 判断元素是否有某个class
 * @param {HTMLElement} ele
 * @param {String} cls
 * @return {Boolean}
 */
export function hasClass(ele: HTMLElement, cls: string): boolean {
    return new RegExp(`(\\s|^)${cls}(\\s|$)`).test(ele.className);
}

/**
 *
 * @desc   为元素添加class
 * @param  {HTMLElement} ele
 * @param  {String} cls
 */
export function addClass(ele: HTMLElement, cls: string): void {
    if (!hasClass(ele, cls)) {
        ele.className += ` ${cls}`;
    }
}


/**
 *
 * @desc 为元素移除class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
export function removeClass(ele: HTMLElement, cls: string): void {
    if (hasClass(ele, cls)) {
        const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);
        ele.className = ele.className.replace(reg, " ");
    }
}

/**
 *
 * @desc 根据name读取cookie
 * @param  {String} name
 * @return {String}
 */
export function getCookie(name: string): string {
    const arr = document.cookie.replace(/\s/g, "").split(";");
    for (let i = 0; i < arr.length; i++) {
        const tempArr = arr[i].split("=");
        if (tempArr[0] === name) {
            return decodeURIComponent(tempArr[1]);
        }
    }
    return "";
}

/**
 *
 * @desc 根据name删除cookie
 * @param  {String} name
 */
export function removeCookie(name: string): void {
    // 设置已过期，系统会立刻删除cookie
    setCookie(name, "1", -1);
}

/**
 *
 * @desc  设置Cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} days
 */
export function setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${value};expires=${date}`;
}

/**
 *
 * @desc 获取浏览器类型和版本
 * @return {String}
 */
export function getExplore(): string {
    const sys: { [propName: string]: any } = {};
    const ua = navigator.userAgent.toLowerCase();
    let s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/))
        ? (sys.ie = s[1])
        : (s = ua.match(/msie ([\d\.]+)/))
            ? (sys.ie = s[1])
            : (s = ua.match(/edge\/([\d\.]+)/))
                ? (sys.edge = s[1])
                : (s = ua.match(/firefox\/([\d\.]+)/))
                    ? (sys.firefox = s[1])
                    : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
                        ? (sys.opera = s[1])
                        : (s = ua.match(/chrome\/([\d\.]+)/))
                            ? (sys.chrome = s[1])
                            : (s = ua.match(/version\/([\d\.]+).*safari/))
                                ? (sys.safari = s[1])
                                : 0;
    // 根据关系进行判断
    if (sys.ie) return `IE: ${sys.ie}`;
    if (sys.edge) return `EDGE: ${sys.edge}`;
    if (sys.firefox) return `Firefox: ${sys.firefox}`;
    if (sys.chrome) return `Chrome: ${sys.chrome}`;
    if (sys.opera) return `Opera: ${sys.opera}`;
    if (sys.safari) return `Safari: ${sys.safari}`;
    return "Unknown";
}

/**
 *
 * @desc 获取操作系统类型
 * @return {String}
 */
export function getOS(): string {
    const userAgent =
        ("navigator" in window &&
            "userAgent" in navigator &&
            navigator.userAgent.toLowerCase()) ||
        "";
    // let vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    const appVersion =
        ("navigator" in window &&
            "appVersion" in navigator &&
            navigator.appVersion.toLowerCase()) ||
        "";

    if (
        /iphone/i.test(userAgent) ||
        /ipad/i.test(userAgent) ||
        /ipod/i.test(userAgent)
    )
        return "ios";
    if (/android/i.test(userAgent)) return "android";
    if (/win/i.test(appVersion) && /phone/i.test(userAgent))
        return "windowsPhone";
    if (/mac/i.test(appVersion)) return "MacOSX";
    if (/win/i.test(appVersion)) return "windows";
    if (/linux/i.test(appVersion)) return "linux";
    return "Unknown";
}
/**
 * 生成一个UID，保证同一时刻生成的值，不同即可，只能用于单机，
 * 不能用来共享，比如：当前生成的ID存到服务器上，会存在重复的风险
 */
export function getUId():String {
    const resAry = Array(4);
    const currentTime = new Date().getTime();
    const uidAry = resAry.map(() => {
        // eslint-disable-next-line no-bitwise
        return `${(Math.random() * 16) | 0}`;
    });
    uidAry.push(currentTime.toString(16));
    return uidAry.join("");
}
/**
 * 根据当前选择器获取cavase元素
 *
 * @param {Number} ele
 * @return {Object} {x: Num, y: Num}
 */
export function formatPos(mouseX: number, mouseY: number) {
    const zoom = (window as any).zoom || 1;
    return { x: mouseX / zoom, y: mouseY / zoom };
}

/**
 * @desc 获取当前时间
 *
 * @return {Number} 时间戳
 */
export function now() {
    if (Date.now) {
        return Date.now();
    }
    return new Date().getTime();
}

/**
 * @desc 函数防抖
 * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
 * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
 * @example 适用场景：如在线编辑的自动存储防抖。
 * @param  {Function} func          延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                  执行去抖动功能时，，调用`callback`。
 * @param  {Number}   wait          0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}  immediate     可选，默认为false。
 *                                  如果为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
 *                                  如果为true，回调函数则在第一次调用return的防抖函数时直接执行
 *
 * @return {Function} 新的防抖函数。
 */
export function debounce(func: () => void, wait: number, immediate: boolean) {
    let timeout: NodeJS.Timeout | null;

    return function executedFunction(this: any, ...args: []) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        // eslint-disable-next-line prefer-rest-params
        // const args: any[] = args;

        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout as NodeJS.Timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

/**
 *
 * @desc 获取元素
 * @param {string | HTMLElement} ele
 * @return {HTMLElement}
 * getEle(ele: any): Element;
 * getEle(ele: string): HTMLElement;
 * getEle(ele: "canvas"): HTMLCanvasElement;
 */
export function getEle(ele) {
    if (typeof ele === "string") {
        return document.querySelector(ele);
    }
    return ele;
}
/**
 *
 * @desc 获取滚动条距顶部的距离
 * @return {Number}
 */
export function getScrollTop(): number {
    return (
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop
    );
}

/**
 *
 * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
 * @param {HTMLElement} ele
 * @returns { {left: number, top: number} }
 */
export function offset(ele: HTMLElement): { left: number; top: number } {
    const pos = {
        left: 0,
        top: 0
    };
    // 递归冒泡
    while (ele) {
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop;
        // @ts-ignore
        ele = ele.offsetParent;
    }
    return pos;
}
var requestAnimFrame = (function () {
    // window.mozRequestAnimationFrame ||#ff低版本
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

/**
 *
 * @desc 设置滚动条距顶部的距离
 * @param {Number} value
 */
export function setScrollTop(value: number): void {
    window.scrollTo(0, value);
    // return value;
}

/**
 *
 * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
 * @param {Number} to
 * @param {Number} duration
 */
export function scrollTo(to: number, duration: number): void {
    if (duration < 0) {
        setScrollTop(to);
        return;
    }
    const diff = to - getScrollTop();
    if (diff === 0) return;
    const step = (diff / duration) * 10;
    requestAnimFrame(function () {
        if (Math.abs(step) > Math.abs(diff)) {
            setScrollTop(getScrollTop() + diff);
            return;
        }
        setScrollTop(getScrollTop() + step);
        if (
            (diff > 0 && getScrollTop() >= to) ||
            (diff < 0 && getScrollTop() <= to)
        ) {
            return;
        }
        scrollTo(to, duration - 16);
    });
}

/**
 *
 * @desc H5软键盘缩回、弹起回调
 * 当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化
 * @param {Function} downCb 当软键盘弹起后，缩回的回调
 * @param {Function} upCb 当软键盘弹起的回调
 */
export function windowResize(downCb: () => void, upCb: () => void): void {
    const clientHeight = window.innerHeight;
    downCb = typeof downCb === "function" ? downCb : function () { };
    upCb = typeof upCb === "function" ? upCb : function () { };
    window.addEventListener("resize", () => {
        const height = window.innerHeight;
        if (height === clientHeight) {
            downCb();
        }
        if (height < clientHeight) {
            upCb();
        }
    });
}

/**
 * @desc   函数节流。
 * 适用于限制`resize`和`scroll`等函数的调用频率
 *
 * @param  {Function}  func           延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                    执行去节流功能时，调用`callback`。
 * @param  {Number}    wait           0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Object}    options        可选，默认为false。
 *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
 *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
 *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
 *
 * @return {Function}  新的节流函数
 */

export function throttle(func: () => void, wait: number, options: any) {
    let timeout: NodeJS.Timeout | null;
    let context: any;
    let args: [] | null;
    let result: any;
    let previous = 0;
    // eslint-disable-next-line no-param-reassign
    if (!options) options = {};

    const later = () => {
        previous = options.leading === false ? 0 : now();
        timeout = null;
        result = func.apply(context, args as []);
        if (!timeout) {
            context = null;
            args = null;
        }
    };

    const throttled = (...targs: []) => {
        // let now = Date.now()||new Date().getTime();
        const tnow = now();
        if (!previous && options.leading === false) previous = tnow;
        const remaining = wait - (tnow - previous);
        // @ts-ignore
        context = this;
        // eslint-disable-next-line prefer-rest-params
        args = targs;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = tnow;
            result = func.apply(context, args);
            if (!timeout) {
                context = null;
                args = null;
            }
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    throttled.cancel = () => {
        clearTimeout(timeout as NodeJS.Timeout);
        previous = 0;
        timeout = null;
        context = null;
        args = null;
    };

    return throttled;
}

/**
 * @desc 根据keycode获得键名
 * @param  {Number} keycode
 * @return {String}
 */
export function getKeyName(keycode: number): string {
    const keyCodeMap: { [propName: string]: any } = {
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "Caps Lock",
        27: "Escape",
        32: "Space",
        33: "Page Up",
        34: "Page Down",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        42: "Print Screen",
        45: "Insert",
        46: "Delete",

        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",

        65: "A",
        66: "B",
        67: "C",
        68: "D",
        69: "E",
        70: "F",
        71: "G",
        72: "H",
        73: "I",
        74: "J",
        75: "K",
        76: "L",
        77: "M",
        78: "N",
        79: "O",
        80: "P",
        81: "Q",
        82: "R",
        83: "S",
        84: "T",
        85: "U",
        86: "V",
        87: "W",
        88: "X",
        89: "Y",
        90: "Z",

        91: "Windows",
        93: "Right Click",

        96: "Numpad 0",
        97: "Numpad 1",
        98: "Numpad 2",
        99: "Numpad 3",
        100: "Numpad 4",
        101: "Numpad 5",
        102: "Numpad 6",
        103: "Numpad 7",
        104: "Numpad 8",
        105: "Numpad 9",
        106: "Numpad *",
        107: "Numpad +",
        109: "Numpad -",
        110: "Numpad .",
        111: "Numpad /",

        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",

        144: "Num Lock",
        145: "Scroll Lock",
        182: "My Computer",
        183: "My Calculator",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    };
    if (keyCodeMap[keycode]) {
        return keyCodeMap[keycode];
    }
    console.log(`Unknow Key(Key Code:${keycode})`);
    return "";
}

/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 * @return {Any}
 */
export function deepClone(values: any): any {
    let copy: { [propName: string]: any };

    // Handle the 3 simple types, and null or undefined
    if (values == null || typeof values !== "object") return values;

    // Handle Date
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }

    // Handle Array
    if (values instanceof Array) {
        copy = [];
        for (let i = 0, len = values.length; i < len; i++) {
            copy[i] = deepClone(values[i]);
        }
        return copy;
    }

    // Handle Object
    if (values instanceof Object) {
        copy = {};
        for (const attr in values) {
            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy values! Its type isn't supported.");
}

/**
 *
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
export function isEmptyObject(obj: object): boolean {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    return !Object.keys(obj).length;
}

/**
 *
 * @desc 随机生成颜色
 * @return {String}
 */
export function randomColor(): string {
    return `#${`00000${((Math.random() * 0x1000000) << 0).toString(16)}`.slice(
        -6
    )}`;
}

/**
 *
 * @desc 生成指定范围[min, max]的随机数
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
export function randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @desc 判断是否为16进制颜色，rgb 或 rgba
 * @param  {String}  str
 * @return {Boolean}
 */
export function isColor(str: string): boolean {
    return /^(#([0-9a-fA-F]{3}){1,2}|[rR][gG][Bb](\((\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*,){2}\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*\)|[Aa]\((\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*,){3}\s*([01]|0\.\d+)\s*\)))$/.test(
        str
    );
}

/**
 *
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean}
 */
export function isEmail(str: string): boolean {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}

/**
 *
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export function isIdCard(str: string | number): boolean {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
        str as string
    );
}

/**
 *
 * @desc 判断是否为数字
 * @param  {Any}  obj
 * @return {Boolean}
 */
export function isNumber(obj: any) {
    return (
        Object.prototype.toString.call(obj) === "[object Number]" && isFinite(obj)
    );
}
/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export function isPhoneNum(str: string | number): boolean {
    return /^(\+?0?86\-?)?1[3456789]\d{9}$/.test(str as string);
}

/**
 *
 * @desc   判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */
export function isUrl(str: string): boolean {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(
        str
    );
}

/**
 *
 * @desc   现金额转大写
 * @param  {Number} n
 * @return {String}
 */
export function digitUppercase(n: number): string {
    const fraction = ["角", "分"];
    const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    const unit = [
        ["元", "万", "亿"],
        ["", "拾", "佰", "仟"]
    ];
    const head = n < 0 ? "欠" : "";
    n = Math.abs(n);
    let s = "";
    for (let i = 0; i < fraction.length; i++) {
        s += (
            digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
        ).replace(/零./, "");
    }
    s = s || "整";
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = "";
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
    }
    return (
        head +
        s
            .replace(/(零.)*零元/, "元")
            .replace(/(零.)+/g, "零")
            .replace(/^整$/, "零元整")
    );
}

/**
 *
 * @desc 判断浏览器是否支持webP格式图片
 * @return {Boolean}
 */
export function isSupportWebP(): boolean {
    return (
        !![].map &&
        document
            .createElement("canvas")
            .toDataURL("image/webp")
            .indexOf("data:image/webp") == 0
    );
}

/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {String} startTime
 * @return {String}
 */
export function formatPassTime(startTime: string): string {
    const aftertime = Date.parse(new Date(startTime).toISOString());
    const currentTime = Date.parse(new Date().toISOString());
    const time = currentTime - aftertime;
    const day = parseInt(`${time / (1000 * 60 * 60 * 24)}`);
    const hour = parseInt(`${time / (1000 * 60 * 60)}`);
    const min = parseInt(`${time / (1000 * 60)}`);
    const month = parseInt(`${day / 30}`);
    const year = parseInt(`${month / 12}`);
    if (year) return `${year}年前`;
    if (month) return `${month}个月前`;
    if (day) return `${day}天前`;
    if (hour) return `${hour}小时前`;
    if (min) return `${min}分钟前`;
    return "刚刚";
}

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
