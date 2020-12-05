/*!
 * (c) 2014-2020 FE-Team
 * Released under the Apache License.
 */
import { fabric } from 'fabric';
import { EventEmitter } from 'events';

/*!
 * (c) 2014-2020 FE-Team
 * Released under the Apache License.
 */

/**
 *
 * @desc 判断两个数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 */
function arrayEqual(arr1, arr2) {
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


function hasClass(ele, cls) {
  return new RegExp(`(\\s|^)${cls}(\\s|$)`).test(ele.className);
}
/**
 *
 * @desc   为元素添加class
 * @param  {HTMLElement} ele
 * @param  {String} cls
 */


function addClass(ele, cls) {
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


function removeClass(ele, cls) {
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


function getCookie(name) {
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


function removeCookie(name) {
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


function setCookie(name, value, days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = `${name}=${value};expires=${date}`;
}
/**
 *
 * @desc 获取浏览器类型和版本
 * @return {String}
 */


function getExplore() {
  const sys = {};
  const ua = navigator.userAgent.toLowerCase();
  let s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] : (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] : (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] : (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] : (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] : (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] : (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0; // 根据关系进行判断

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


function getOS() {
  const userAgent = "navigator" in window && "userAgent" in navigator && navigator.userAgent.toLowerCase() || ""; // let vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';

  const appVersion = "navigator" in window && "appVersion" in navigator && navigator.appVersion.toLowerCase() || "";
  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return "ios";
  if (/android/i.test(userAgent)) return "android";
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return "windowsPhone";
  if (/mac/i.test(appVersion)) return "MacOSX";
  if (/win/i.test(appVersion)) return "windows";
  if (/linux/i.test(appVersion)) return "linux";
  return "Unknown";
}
/**
 * 生成一个UID，保证同一时刻生成的值，不同即可，只能用于单机，
 * 不能用来共享，比如：当前生成的ID存到服务器上，会存在重复的风险
 */


function getUId() {
  const resAry = Array(4);
  const currentTime = new Date().getTime();
  const uidAry = resAry.map(() => {
    // eslint-disable-next-line no-bitwise
    return `${Math.random() * 16 | 0}`;
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


function formatPos(mouseX, mouseY) {
  const zoom = window.zoom || 1;
  return {
    x: mouseX / zoom,
    y: mouseY / zoom
  };
}
/**
 * 获取当前时间
 *
 * @return {Number} 时间戳
 */


function now() {
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


function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this; // eslint-disable-next-line prefer-rest-params
    // const args: any[] = args;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
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


function getEle(ele) {
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


function getScrollTop() {
  return document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
}
/**
 *
 * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
 * @param {HTMLElement} ele
 * @returns { {left: number, top: number} }
 */


function offset(ele) {
  const pos = {
    left: 0,
    top: 0
  }; // 递归冒泡

  while (ele) {
    pos.left += ele.offsetLeft;
    pos.top += ele.offsetTop; // @ts-ignore

    ele = ele.offsetParent;
  }

  return pos;
}

var requestAnimFrame = function () {
  // window.mozRequestAnimationFrame ||#ff低版本
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();
/**
 *
 * @desc 设置滚动条距顶部的距离
 * @param {Number} value
 */


function setScrollTop(value) {
  window.scrollTo(0, value); // return value;
}
/**
 *
 * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
 * @param {Number} to
 * @param {Number} duration
 */


function scrollTo(to, duration) {
  if (duration < 0) {
    setScrollTop(to);
    return;
  }

  const diff = to - getScrollTop();
  if (diff === 0) return;
  const step = diff / duration * 10;
  requestAnimFrame(function () {
    if (Math.abs(step) > Math.abs(diff)) {
      setScrollTop(getScrollTop() + diff);
      return;
    }

    setScrollTop(getScrollTop() + step);

    if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
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


function windowResize(downCb, upCb) {
  const clientHeight = window.innerHeight;
  downCb = typeof downCb === "function" ? downCb : function () {};
  upCb = typeof upCb === "function" ? upCb : function () {};
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


function throttle(func, wait, options) {
  let timeout;
  let context;
  let args;
  let result;
  let previous = 0; // eslint-disable-next-line no-param-reassign

  if (!options) options = {};

  const later = () => {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);

    if (!timeout) {
      context = null;
      args = null;
    }
  };

  const throttled = (...targs) => {
    // let now = Date.now()||new Date().getTime();
    const tnow = now();
    if (!previous && options.leading === false) previous = tnow;
    const remaining = wait - (tnow - previous); // @ts-ignore

    context = this; // eslint-disable-next-line prefer-rest-params

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
    clearTimeout(timeout);
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


function getKeyName(keycode) {
  const keyCodeMap = {
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


function deepClone(values) {
  let copy; // Handle the 3 simple types, and null or undefined

  if (values == null || typeof values !== "object") return values; // Handle Date

  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  } // Handle Array


  if (values instanceof Array) {
    copy = [];

    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i]);
    }

    return copy;
  } // Handle Object


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


function isEmptyObject(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
  return !Object.keys(obj).length;
}
/**
 *
 * @desc 随机生成颜色
 * @return {String}
 */


function randomColor() {
  return `#${`00000${(Math.random() * 0x1000000 << 0).toString(16)}`.slice(-6)}`;
}
/**
 *
 * @desc 生成指定范围[min, max]的随机数
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */


function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 *
 * @desc 判断是否为16进制颜色，rgb 或 rgba
 * @param  {String}  str
 * @return {Boolean}
 */


function isColor(str) {
  return /^(#([0-9a-fA-F]{3}){1,2}|[rR][gG][Bb](\((\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*,){2}\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*\)|[Aa]\((\s*(2[0-4]\d|25[0-5]|[01]?\d{1,2})\s*,){3}\s*([01]|0\.\d+)\s*\)))$/.test(str);
}
/**
 *
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean}
 */


function isEmail(str) {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}
/**
 *
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */


function isIdCard(str) {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
}
/**
 *
 * @desc 判断是否为数字
 * @param  {Any}  obj
 * @return {Boolean}
 */


function isNumber(obj) {
  return Object.prototype.toString.call(obj) === "[object Number]" && isFinite(obj);
}
/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */


function isPhoneNum(str) {
  return /^(\+?0?86\-?)?1[3456789]\d{9}$/.test(str);
}
/**
 *
 * @desc   判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */


function isUrl(str) {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}
/**
 *
 * @desc   现金额转大写
 * @param  {Number} n
 * @return {String}
 */


function digitUppercase(n) {
  const fraction = ["角", "分"];
  const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
  const head = n < 0 ? "欠" : "";
  n = Math.abs(n);
  let s = "";

  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, "");
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

  return head + s.replace(/(零.)*零元/, "元").replace(/(零.)+/g, "零").replace(/^整$/, "零元整");
}
/**
 *
 * @desc 判断浏览器是否支持webP格式图片
 * @return {Boolean}
 */


function isSupportWebP() {
  return !![].map && document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") == 0;
}
/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {String} startTime
 * @return {String}
 */


function formatPassTime(startTime) {
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


function formatRemainTime(endTime) {
  const startDate = new Date(); // 开始时间

  const endDate = new Date(endTime); // 结束时间

  const t = endDate.getTime() - startDate.getTime(); // 时间差

  let d = 0;
  let h = 0;
  let m = 0;
  let s = 0;

  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);
  }

  return `${d}天 ${h}小时 ${m}分钟 ${s}秒`;
}
/**
 *
 * @desc 是否为闰年
 * @param {Number} year
 * @return {Boolean}
 */


function isLeapYear(year) {
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


function isSameDay(date1, date2) {
  if (!date2) {
    date2 = new Date();
  }

  const date1_year = date1.getFullYear();
  const date1_month = date1.getMonth() + 1;
  const date1_date = date1.getDate();
  const date2_year = date2.getFullYear();
  const date2_month = date2.getMonth() + 1;
  const date2_date = date2.getDate();
  return date1_date === date2_date && date1_month === date2_month && date1_year === date2_year;
}
/**
 * @desc 获取指定日期月份的总天数
 * @param {Date} time
 * @return {Number}
 */


function monthDays(date) {
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


function timeLeft(startTime, endTime) {
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
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);
  }

  return {
    d,
    h,
    m,
    s
  };
}
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
 * @desc   对象序列化
 * @param  {Object} obj
 * @return {String}
 */


function stringfyQueryString(obj) {
  if (!obj) return "";
  const pairs = [];

  for (const key in obj) {
    const value = obj[key];

    if (value instanceof Array) {
      for (let i = 0; i < value.length; ++i) {
        pairs.push(`${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(value[i])}`);
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


function convertBase64UrlToBlob(urlData) {
  const arr = urlData.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {
    type: mime
  });
}
/**
 *
 * @desc   获取UUID
 * @return {String}
 */


function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c == "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
/**
 *
 * @desc   获取浏览器信息
 * @return  {Object} obj
 */


function getBrowser() {
  const Sys = {
    name: "",
    ver: ""
  };
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
  return {
    Sys,
    info: ua
  };
}
/**
 *
 * @desc   获取系统名称和版本号
 * @return {String} example: mac68k win7
 */


function checkOS() {
  const sUserAgent = navigator.userAgent.toLowerCase();
  const sPlatform = navigator.platform.toLowerCase();
  const isWin = sPlatform === "win32" || sPlatform === "windows";
  const isMac = sPlatform === "mac68k" || sPlatform === "macppc" || sPlatform === "macintosh" || sPlatform === "macintel";
  const isUnix = sPlatform === "x11" && !isWin && !isMac;
  const isLinux = String(sPlatform).indexOf("linux") > -1;
  if (isMac) return "MAC";
  if (isUnix) return "Unix";
  if (isLinux) return "Linux";

  if (isWin) {
    const isWin2K = sUserAgent.indexOf("windows nt 5.0") > -1 || sUserAgent.indexOf("windows 2000") > -1;
    if (isWin2K) return "Win2000";
    const isWinXP = sUserAgent.indexOf("windows nt 5.1") > -1 || sUserAgent.indexOf("windows xp") > -1;
    if (isWinXP) return "WinXP";
    const isWin2003 = sUserAgent.indexOf("windows nt 5.2") > -1 || sUserAgent.indexOf("windows 2003") > -1;
    if (isWin2003) return "Win2003";
    const isWinVista = sUserAgent.indexOf("windows nt 6.0") > -1 || sUserAgent.indexOf("windows vista") > -1;
    if (isWinVista) return "WinVista";
    const isWin7 = sUserAgent.indexOf("windows nt 6.1") > -1 || sUserAgent.indexOf("windows 7") > -1;
    if (isWin7) return "Win7";
    const isWin8 = sUserAgent.indexOf("windows nt 6.2") > -1 || sUserAgent.indexOf("windows nt 6.3") > -1 || sUserAgent.indexOf("windows 8") > -1;
    if (isWin8) return "Win8";
    const isWin10 = sUserAgent.indexOf("windows nt 10") > -1 || sUserAgent.indexOf("windows 10") > -1;
    if (isWin10) return "Win10";
  }

  return "other";
}
/**
 *
 * @desc   从sessionStorage获取UserId，如无根据ISO时间戳生成
 * @return {String}
 */


function getUserId() {
  const userId = sessionStorage.getItem("userId");

  if (userId) {
    return userId;
  }

  const temp = Date.parse(new Date().toISOString()) % 100000000 / 1000;
  const userIdTemp = `${Number.parseInt(temp)}`;
  sessionStorage.setItem("userId", userIdTemp);
  return userIdTemp;
}
/**
 *
 * @desc   获取Mac系统版本
 * @return {String}
 */


function getMacOsVersion() {
  return navigator.userAgent.substr(navigator.userAgent.indexOf("OS X") + 5, navigator.userAgent.substr(navigator.userAgent.indexOf("OS X") + 5).indexOf(")"));
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
   * 是否为一对一app
   */
  msb1v1app: typeof navigator !== 'undefined' && typeof uaParsed.ua !== 'undefined' && (uaParsed.ua.includes('ydy') || uaParsed.ua.includes('vwb'))
};

var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addClass: addClass,
    arrayEqual: arrayEqual,
    checkOS: checkOS,
    convertBase64UrlToBlob: convertBase64UrlToBlob,
    debounce: debounce,
    deepClone: deepClone,
    digitUppercase: digitUppercase,
    formatPassTime: formatPassTime,
    formatPos: formatPos,
    formatRemainTime: formatRemainTime,
    getBrowser: getBrowser,
    getCookie: getCookie,
    getEle: getEle,
    getExplore: getExplore,
    getKeyName: getKeyName,
    getMacOsVersion: getMacOsVersion,
    getOS: getOS,
    getScrollTop: getScrollTop,
    getUId: getUId,
    getUUID: getUUID,
    getUserId: getUserId,
    hasClass: hasClass,
    isColor: isColor,
    isEmail: isEmail,
    isEmptyObject: isEmptyObject,
    isIdCard: isIdCard,
    isLeapYear: isLeapYear,
    isNumber: isNumber,
    isPhoneNum: isPhoneNum,
    isSameDay: isSameDay,
    isSupportWebP: isSupportWebP,
    isUrl: isUrl,
    loadScript: loadScript,
    monthDays: monthDays,
    now: now,
    offset: offset,
    parseQuery: parseQuery,
    platform: platform,
    randomColor: randomColor,
    randomNum: randomNum,
    removeClass: removeClass,
    removeCookie: removeCookie,
    scrollTo: scrollTo,
    setCookie: setCookie,
    setScrollTop: setScrollTop,
    stringfyQueryString: stringfyQueryString,
    throttle: throttle,
    timeLeft: timeLeft,
    windowResize: windowResize
});

const boardEventList = [
    'object:modified',
    'object:rotated',
    'object:scaled',
    'object:moved',
    'object:skewed',
    'object:rotating',
    'object:scaling',
    'object:moving',
    'object:skewing',
    'before:transform',
    'before:selection:cleared',
    'selection:cleared',
    'selection:updated',
    'selection:created',
    'path:created',
    'mouse:down',
    'mouse:move',
    'mouse:up',
    'mouse:down:before',
    'mouse:move:before',
    'mouse:up:before',
    'mouse:over',
    'mouse:out',
    'mouse:dblclick',
    'event:dragover',
    'event:dragenter',
    'event:dragleave',
    'event:drop',
    'object:added',
    'object:removed',
];
var config = {
    boardEventList,
};

// import { ICanvas } from "./interface";
/**
 * 增强canvas的能力
 * 支持 选择器
 * 删除对 ID的支持
 * 增强背景类型
 * 支持销毁实例
 * TODO: 需要验证自定义类对cache的影响
 * TODO: 需要根据实际情况，完善方法
 *
 */
class Canvas extends fabric.Canvas {
    constructor(ele, options) {
        super(getEle(ele), options);
        this.options = {
            ...options
        };
        this.ele = ele;
        this.cvsId = getUId();
    }
    destory() {
        this.dispose();
    }
}

var DRAW_TYPE;
(function (DRAW_TYPE) {
    DRAW_TYPE[DRAW_TYPE["UNKNOWEN"] = 0] = "UNKNOWEN";
    DRAW_TYPE[DRAW_TYPE["CIRCLE"] = 1] = "CIRCLE";
    DRAW_TYPE[DRAW_TYPE["RECT"] = 2] = "RECT";
    DRAW_TYPE[DRAW_TYPE["FREE"] = 3] = "FREE";
    DRAW_TYPE[DRAW_TYPE["PATH"] = 4] = "PATH";
    DRAW_TYPE[DRAW_TYPE["IMAGE"] = 5] = "IMAGE";
    DRAW_TYPE[DRAW_TYPE["TEXT"] = 6] = "TEXT";
    DRAW_TYPE[DRAW_TYPE["ITEXT"] = 7] = "ITEXT";
    DRAW_TYPE[DRAW_TYPE["ELLIPSE"] = 8] = "ELLIPSE";
    DRAW_TYPE[DRAW_TYPE["LINE"] = 9] = "LINE";
    DRAW_TYPE[DRAW_TYPE["POINT"] = 10] = "POINT";
    DRAW_TYPE[DRAW_TYPE["POINT_LINE"] = 11] = "POINT_LINE";
    DRAW_TYPE[DRAW_TYPE["POLYHON"] = 12] = "POLYHON";
    DRAW_TYPE[DRAW_TYPE["POLY_LINE"] = 13] = "POLY_LINE";
    DRAW_TYPE[DRAW_TYPE["TEXT_BOX"] = 14] = "TEXT_BOX";
    DRAW_TYPE[DRAW_TYPE["TRIANGLE"] = 15] = "TRIANGLE";
    DRAW_TYPE[DRAW_TYPE["SELECT"] = 16] = "SELECT";
    DRAW_TYPE[DRAW_TYPE["DELETE"] = 17] = "DELETE";
    DRAW_TYPE[DRAW_TYPE["CLIP"] = 18] = "CLIP";
})(DRAW_TYPE || (DRAW_TYPE = {}));
const klassMap = {
    '1': 'Circle',
    '2': 'Rect',
    '3': 'Path',
    '4': 'Path',
    '5': 'Image',
};
const getFabricClass = (val) => {
    let inputVal = '';
    if (typeof val !== 'string') {
        inputVal = `${val}`;
    }
    else {
        inputVal = val;
    }
    return klassMap[inputVal];
};
/**
 * 根据当前值获取绘制类型
 *
 * @param {number} val
 * @returns
 */
const getDrawTypeByVal = (val) => {
    if (!val) {
        return [];
    }
    const result = [];
    Object.keys(DRAW_TYPE).forEach(member => {
        if (DRAW_TYPE[member] === val) {
            result.push(member);
        }
    });
    // for (const member in DRAW_TYPE) {
    //     if (DRAW_TYPE[member] === val) {
    //         result.push(member);
    //     }
    // }
    return result;
};
/**
 * 检测当前绘制类型是否合法
 *
 * @param {number} drawType
 * @returns {boolean}
 */
const checkDrawType = (drawType) => {
    if (getDrawTypeByVal(drawType).length < 1) {
        return false;
    }
    return true;
};
var DRAW_TYPE$1 = DRAW_TYPE;

/**
 * 绘制的基础类，类似一个接口，因为ES 7并不支持接口，后续可以使用Typescript 来实现
 * 该类只是定义了
 *
 *
 *
 * @class Draw
 */
class DrawContoller {
    constructor(canvas, drawIns) {
        if (!canvas) {
            throw new Error('drawContoll: 需要参数 canvas');
        }
        this.canvas = canvas;
        this.name = 'DrawContoller';
        this.drawIns = drawIns;
    }
    prepareDraw() {
        this.canvas.skipTargetFind = true; // 画板元素不能被选中
        this.canvas.selection = false;
        this.canvas.isDrawingMode = false;
    }
    prepareSelect() {
        this.canvas.selection = true;
        this.canvas.skipTargetFind = false;
        this.canvas.selectable = true;
        this.canvas.isDrawingMode = false;
    }
    startDraw() { }
    draw() { }
    endDraw() { }
    initEvent() { }
    teardownEvent() { }
    pathCreated(currentPath) {
        console.log('DrawContoller pathCreated call:', currentPath);
    }
}

class FreeDrawController extends DrawContoller {
    constructor(canvas, drawIns) {
        super(canvas, drawIns);
        this.name = 'FreeDrawController';
        this.startDraw = this.startDraw.bind(this);
        this.endDraw = this.endDraw.bind(this);
    }
    setPenWidth(width) {
        if (!isNumber(width)) {
            return;
        }
        this.canvas.freeDrawingBrush.width = width;
    }
    setPenColor(color) {
        const colorVal = new fabric.Color(color).getSource(); //util.getColorSource(color);
        if (!colorVal) {
            console.warn('传入的颜色格式不正确: ', color);
            return;
        }
        this.canvas.freeDrawingBrush.color = color;
    }
    getPenWidth() {
        return this.canvas.freeDrawingBrush.width;
    }
    getPenColor() {
        return this.canvas.freeDrawingBrush.color;
    }
    startDraw() {
        this.canvas.isDrawingMode = true;
    }
    endDraw() {
        this.canvas.isDrawingMode = false;
    }
    initEvent() {
        this.drawIns.on(`typeChange:${DRAW_TYPE.FREE}`, this.startDraw);
    }
    teardownEvent() {
        this.drawIns.removeListener(`typeChange:${DRAW_TYPE.FREE}`, this.startDraw);
    }
}

class CircleDrawController extends DrawContoller {
    constructor(canvas, board) {
        super(canvas, board);
        this.name = 'CircleDrawController';
        this.startPos = {
            x: 0,
            y: 0,
        };
        this.endPos = {
            x: 0,
            y: 0,
        };
        this.currentDrawn = null;
        this.stroke = '';
        this.fill = '';
        this.strokeWidth = 1;
        this.collections = [];
        this.isStartDraw = false;
        this.onSelected = this.onSelected.bind(this);
        this.onStartDraw = this.onStartDraw.bind(this);
        this.onDraw = this.onDraw.bind(this);
        this.onEndDraw = this.onEndDraw.bind(this);
    }
    startDraw(pos) {
        if (!pos) {
            return;
        }
        this.startPos = {
            x: pos.x,
            y: pos.y,
        };
    }
    drawCircle() {
        if (this.currentDrawn) {
            this.canvas.remove(this.currentDrawn);
            this.currentDrawn = null;
        }
        const left = this.startPos.x;
        const top = this.startPos.y;
        const radius = Math.sqrt(Math.pow(this.endPos.x - left, 2) + Math.pow(this.endPos.y - top, 2)) / 2;
        // eslint-disable-next-line no-undef
        this.currentDrawn = new fabric.Circle({
            left,
            top,
            stroke: 'red',
            fill: this.fill,
            radius,
            strokeWidth: this.strokeWidth,
        });
        this.currentDrawn.set('originX', this.endPos.x - left < 0 ? 'right' : 'left');
        this.currentDrawn.set('originY', this.endPos.y - top < 0 ? 'bottom' : 'top');
        this.canvas.add(this.currentDrawn);
        this.canvas.renderAll();
    }
    draw(pos) {
        this.endPos.x = pos.x;
        this.endPos.y = pos.y;
        this.drawCircle();
    }
    endDraw(pos) {
        this.draw(pos);
        this.collections.push(this.currentDrawn);
        this.currentDrawn = null;
    }
    onSelected() {
        this.prepareDraw();
    }
    onStartDraw(evt) {
        const pos = formatPos(evt.pointer.x, evt.pointer.y);
        this.isStartDraw = true;
        this.startDraw(pos);
    }
    onDraw(evt) {
        if (!this.isStartDraw) {
            return;
        }
        const pos = formatPos(evt.pointer.x, evt.pointer.y);
        this.draw(pos);
    }
    onEndDraw(evt) {
        const pos = formatPos(evt.pointer.x, evt.pointer.y);
        this.isStartDraw = false;
        // this.drawInfo.x = pos.x;
        // this.drawInfo.y = pos.y;
        // if (!this.currentDrawControll) {
        //     return;
        // }
        this.endDraw(pos);
    }
    initEvent() {
        this.canvas.on('mouse:down', this.onStartDraw);
        this.canvas.on('mouse:move', this.onDraw);
        this.canvas.on('mouse:up', this.onEndDraw);
        this.drawIns.on(`typeChange:${DRAW_TYPE.CIRCLE}`, this.onSelected);
    }
    teardownEvent() {
        this.canvas.off('mouse:down', this.onStartDraw);
        this.canvas.off('mouse:move', this.onDraw);
        this.canvas.off('mouse:up', this.onEndDraw);
        this.drawIns.removeListener(`typeChange:${DRAW_TYPE.CIRCLE}`, this.onSelected);
    }
    setStokeColor() { }
    setFillColor() { }
    setStrokeWidth() { }
    getAllCircles() { }
    remove() { }
}

class DeleteDrawController extends DrawContoller {
    constructor(canvas, board) {
        super(canvas, board);
        this.name = 'DeleteDrawController';
        this.endDraw = this.endDraw.bind(this);
        this.onSelected = this.onSelected.bind(this);
        const opts = {
            beforeDelete: () => { },
            ...this.drawIns.board.options.deleteOpts,
        };
        this.beforeDelete = opts.beforeDelete || (() => { });
    }
    endDraw() {
        const currentSelects = this.canvas.getActiveObjects();
        // TODO: 存在性能问题，需要优化
        currentSelects.forEach(v => {
            if (this.beforeDelete(v) === false) {
                return;
            }
            this.canvas.remove(v);
        });
        this.canvas.discardActiveObject(); //'delete:select'
        console.log('结束绘制:', currentSelects);
    }
    onSelected() {
        this.prepareSelect();
    }
    initEvent() {
        this.canvas.on('mouse:up', this.endDraw);
        this.drawIns.on(`typeChange:${DRAW_TYPE.DELETE}`, this.onSelected);
    }
    teardownEvent() {
        this.canvas.off('mouse:up', this.endDraw);
        this.drawIns.removeListener(`typeChange:${DRAW_TYPE.DELETE}`, this.onSelected);
    }
}

class DefaultDrawController extends DrawContoller {
}

// eslint-disable-next-line no-undef
// const { Color } = fabric;
class ClipDrawController extends DrawContoller {
    constructor(canvas, board) {
        super(canvas, board);
        this.name = 'ClipDrawController';
        this.isEnable = false;
        this.pathCreated = this.pathCreated.bind(this);
    }
    setPenWidth(width) {
        if (!isNumber(width)) {
            return;
        }
        this.canvas.freeDrawingBrush.width = width;
    }
    setPenColor(color) {
        const colorVal = new fabric.Color(color).getSource(); //util.getColorSource(color)
        if (!colorVal) {
            console.warn('传入的颜色格式不正确: ', color);
            return;
        }
        // const colorSource = new Color(color);
        // const hexColor = colorSource.toHexa();
        this.canvas.freeDrawingBrush.color = color;
    }
    startDraw() {
        this.canvas.isDrawingMode = true;
        this.isEnable = true;
    }
    endDraw() {
        this.canvas.isDrawingMode = false;
        this.isEnable = false;
    }
    pathCreated(currentPath) {
        if (!this.isEnable) {
            return;
        }
        this.canvas.clipPath = currentPath.path;
        this.canvas.drawClipPathOnCanvas(this.canvas.getContext());
    }
}

class SelectDrawController extends DrawContoller {
    constructor(canvas, drawIns) {
        super(canvas, drawIns);
        this.name = 'SelectDrawController';
        this.onSelected = this.onSelected.bind(this);
    }
    onSelected() {
        this.prepareSelect();
    }
    initEvent() {
        this.drawIns.on(`typeChange:${DRAW_TYPE.SELECT}`, this.onSelected);
    }
    teardownEvent() {
        this.drawIns.removeListener(`typeChange:${DRAW_TYPE.SELECT}`, this.onSelected);
    }
}

/**
 * 鼠标绘制，单独出来是想确保在 Board 初始化阶段可以很容易的配置进行，比如当开发者
 * 不想使用鼠标绘制的时候，可以很容易的移除，如果混合在Board内的话对这些操作就会很麻烦
 *
 * @class MouseDraw
 */
class MouseDraw extends EventEmitter {
    constructor(drawCanvas, board) {
        super();
        this.drawType = DRAW_TYPE$1.UNKNOWEN;
        this.preDrawType = DRAW_TYPE$1.UNKNOWEN;
        this.drawInfo = {
            x: 0,
            y: 0,
        };
        this.drawCanvas = drawCanvas;
        this.board = board;
        this.isStartDraw = false;
        this.currentDraw = null;
        // TODO：可以做delay init
        this.freeDrawControll = new FreeDrawController(this.drawCanvas, this);
        this.circleDrawControll = new CircleDrawController(this.drawCanvas, this);
        this.deleteDrawController = new DeleteDrawController(this.drawCanvas, this);
        this.clipDrawController = new ClipDrawController(this.drawCanvas, this);
        this.selectDrawController = new SelectDrawController(this.drawCanvas, this);
        this.defaultController = new DefaultDrawController(this.drawCanvas, this);
        // 默认为空控制器，为了做一下默认操作
        this.currentDrawControll = this.defaultController;
        this.preDrawController = this.defaultController;
        this.startDraw = this.startDraw.bind(this);
        this.draw = this.draw.bind(this);
        this.endDraw = this.endDraw.bind(this);
    }
    _bindEvent() {
        // TODO：优化事件绑定
        if (this.drawType === DRAW_TYPE$1.CLIP) {
            this.drawCanvas.on('path:created', this.currentDrawControll.pathCreated);
            return;
        }
        this.currentDrawControll.initEvent();
    }
    _debindEvent() {
        // remove all, 会议除所有的事件绑定，造成难以追踪的bug
        // this.drawCanvas.removeListeners();
        // TODO：优化事件绑定
        if (this.preDrawType === DRAW_TYPE$1.CLIP) {
            this.drawCanvas.off('path:created', this.currentDrawControll.pathCreated);
            this.preDrawController.endDraw();
        }
        this.preDrawController.teardownEvent();
    }
    _execDrawAction() {
        this.preDrawController = this.currentDrawControll;
        this.currentDrawControll = this.getContollByType();
        // 可以合二为一
        // 移除老的事件绑定
        this._debindEvent();
        // 添加新的事件绑定
        this._bindEvent();
        // if (type === DRAW_TYPE.FREE) {
        //     this.freeDrawControll.startDraw();
        // } else if (type === DRAW_TYPE.SELECT) {
        //     this.currentDrawControll.prepareSelect();
        //     // this._debindEvent();
        // } else if (type === DRAW_TYPE.CLIP) {
        //     // TODO: 优化获取controller的方式
        //     // this.currentDrawControll.prepareSelect();
        //     this.currentDrawControll.startDraw();
        //     this._bindEvent();
        //     // this._debindEvent();
        // } else if (type === DRAW_TYPE.DELETE) {
        //     // this.currentDrawControll = this.getContollByType(this.drawType);
        //     this.currentDrawControll.prepareSelect();
        //     this._bindEvent();
        //     // this._debindEvent();
        // } else {
        //     // this.currentDrawControll = this.getContollByType(this.drawType);
        //     this.currentDrawControll.prepareDraw();
        //     this._bindEvent();
        // }
    }
    updateDrawType(type) {
        if (!checkDrawType(type)) {
            return;
        }
        this.preDrawType = this.drawType;
        this.drawType = type;
        this._execDrawAction();
        // must aftter bind event
        this.emit(`typeChange:${type}`, {
            preType: this.drawType,
            currType: type,
        });
        this.emit('typeChange', {
            preType: this.drawType,
            currType: type,
        });
    }
    getContollByType() {
        switch (this.drawType) {
            case DRAW_TYPE$1.CIRCLE:
                return this.circleDrawControll;
            case DRAW_TYPE$1.DELETE:
                return this.deleteDrawController;
            case DRAW_TYPE$1.CLIP:
                return this.clipDrawController;
            case DRAW_TYPE$1.FREE:
                return this.freeDrawControll;
            case DRAW_TYPE$1.SELECT:
                return this.selectDrawController;
            default:
                return this.defaultController;
        }
    }
    startDraw(evt) {
        const pos = formatPos(evt.pointer.x, evt.pointer.y);
        this.isStartDraw = true;
        this.drawInfo.x = pos.x;
        this.drawInfo.y = pos.y;
        if (!this.currentDrawControll) {
            return;
        }
        this.currentDrawControll.startDraw(pos);
    }
    draw(evt) {
        if (!this.isStartDraw) {
            return;
        }
        const pos = formatPos(evt.pointer.x, evt.pointer.y);
        this.drawInfo.x = pos.x;
        this.drawInfo.y = pos.y;
        if (!this.currentDrawControll) {
            return;
        }
        this.currentDrawControll.draw(pos);
    }
    endDraw(evt) {
        const pos = formatPos(evt.pointer.x, evt.pointer.y);
        this.isStartDraw = false;
        this.drawInfo.x = pos.x;
        this.drawInfo.y = pos.y;
        if (!this.currentDrawControll) {
            return;
        }
        this.currentDrawControll.endDraw(pos);
    }
}

/**
 * @description Board 是整个程序入口，用来初始化程序，给外部提供修改配置的接口，对外部暴露项目状态。
 * 项目中只用来，初始化项目，参数校验，对外部提供接口，对外部暴露状态
 *
 * 第一版实现，只提供接口，不对外提供控制组件等相关的UI
 *
 */
class Board extends EventEmitter {
    /**
     * Creates an instance of Board.
     * @param {*} 初始化参与定义 {
     *  canvas: string(css-selector | id) | htmlElement 用来渲染
     *  width: number 宽 可以用来覆盖默认宽
     *  height: number 高 可以用来覆盖默认高
     *  backgroundColor: string 背景颜色
     *  overlayImage: string 遮罩图片
     *  backgroundImage: sting 背景图片
     *  overlayColor: string 遮罩层颜色
     *
     * }
     * @memberof Board
     */
    constructor(options) {
        super();
        this.options = {
            width: 0,
            height: 0,
            backgroundColor: '',
            overlayImage: '',
            overlayColor: '',
            backgroundImage: '',
            selection: true,
            enableRetinaScaling: false,
            deleteOpts: {
                beforeDelete: () => { },
            },
            ...options,
        };
        if (!this.options.canvas) {
            throw new Error('需要传入canvas id，或者 canvas 元素');
        }
        this.canvas = this.options.canvas;
        this.size = {
            width: this.options.width,
            height: this.options.height,
        };
        this.drawType = DRAW_TYPE$1.UNKNOWEN;
        this.isStartDraw = false;
        this.fCanvas = this._initCanvas();
        this.mouseDraw = new MouseDraw(this.fCanvas, this);
        // 添加当前集合对象指向画布添加的对象
        this.collections = [];
        this.historyIdx = this.collections.length;
        // TODO: 后续需要改成根据场景进行绑定
        // this._bindEvent();
    }
    _initCanvas() {
        const fCanvas = new Canvas(this.canvas, {
            width: this.size.width,
            height: this.size.height,
            backgroundColor: this.options.backgroundColor,
            overlayColor: this.options.overlayColor,
            overlayImage: this.options.overlayImage,
            backgroundImage: this.options.backgroundImage,
            enableRetinaScaling: this.options.enableRetinaScaling,
        });
        // this.fCanvas = fCanvas;
        fCanvas.selection = this.options.selection;
        this._initEvent();
        this._exporseEvent();
        return fCanvas;
    }
    // TODO: 绑定事件能否做成根据不同场景进行绑定，没有场景移除事件，性能考虑
    _initEvent() {
        // this.fCanvas.off('mouse:down', this.mouseDraw.startDraw);
        // this.fCanvas.off('mouse:move', this.mouseDraw.draw);
        // this.fCanvas.off('mouse:up', this.mouseDraw.endDraw);
        // 扩展
        this.fCanvas.on('object:added', evt => {
            if (!evt.target) {
                return;
            }
            if (!evt.target.get('__msb_id')) {
                evt.target.set('__msb_id', getUId());
            }
        });
    }
    /**
     * 对外暴露所有事件
     *
     * @memberof Board
     */
    _exporseEvent() {
        config.boardEventList.forEach(v => {
            this.fCanvas.on(v, (...args) => {
                this.emit(v, ...args);
            });
        });
    }
    /**
     * 移除绑定的事件
     *
     * @param {string} evtName
     * @param {function} listeners
     * @memberof Board
     */
    _dexporseEvent(evtName, listeners) {
        this.removeListener(evtName, listeners);
    }
    setBackgroundColor(color) {
        this.fCanvas.setBackgroundColor(color, function () { });
        this.fCanvas.renderAll();
    }
    setOverlayColor(color) {
        this.fCanvas.setOverlayColor(color, function () { });
        this.fCanvas.renderAll();
    }
    // 用来做实时绘制
    createPencil() {
        return new fabric.PencilBrush();
    }
    // 创建path
    createPath(paths) {
        return new fabric.Path(paths);
    }
    createPoint(point) {
        const p = {
            x: 0,
            y: 0,
            ...point,
        };
        return new fabric.Point(p.x, p.y);
    }
    // 更新当前配置
    setWidth(width) {
        if (typeof width !== 'number') {
            return;
        }
        this.fCanvas.setWidth(width);
    }
    // 更新当前配置
    setHeight(height) {
        if (typeof height !== 'number') {
            return;
        }
        this.fCanvas.setHeight(height);
    }
    // 禁用 canvas 交互
    diableInteractive() {
        // 创建一个div
        // this.fCanvas.set('interactive', isInteractive);
    }
    /**
     * 取消选中
     *
     * @param {*} e 事件对象，默认课不传
     * @memberof Board
     */
    discardActiveObject(e) {
        this.fCanvas.discardActiveObject(e);
        this.fCanvas.requestRenderAll();
    }
    /**
     * 根据id 获取 object
     *
     * @param {*} id
     * @returns
     * @memberof Board
     */
    findIndexById(id) {
        let idx = -1;
        this.fCanvas.forEachObject((v, i) => {
            if (v && v.__msb_id === id) {
                idx = i;
            }
        });
        return idx;
    }
    /**
     * 根据id 获取 object
     *
     * @param {*} id
     * @returns
     * @memberof Board
     */
    findObjectById(id) {
        let res = null;
        this.fCanvas.forEachObject(v => {
            if (v && v.__msb_id === id) {
                res = v;
            }
        });
        return res;
    }
    /**
     *
     * 是否开启编组
     * @param {boolean} enable
     * @memberof Board
     */
    enableSelection(enable) {
        this.fCanvas.selection = !!enable;
    }
    /**
     * 添加绘制对象
     *
     * @param {fabric.Object} object
     * @returns
     * @memberof Board
     */
    addObject(object) {
        if (!object) {
            return;
        }
        const idx = this.findIndexById(object.__msb_id);
        // object.setCoords(false, true);
        if (idx < 0) {
            this.fCanvas.add(object);
        }
        else {
            // replace
            this.fCanvas.insertAt(object, idx, true);
        }
        // fix image remove bug
        this.fCanvas.renderAll();
    }
    /**
     * 获取当前矩阵
     *
     * @returns Array
     * @memberof Board
     */
    getMatrix() {
        const matrix = this.fCanvas.viewportTransform;
        return fabric.util.qrDecompose(matrix);
    }
    // TODO: __msb_id 需要提出来 不应该放在框架里面
    removeById(object) {
        const idx = this.findIndexById(object.__msb_id);
        if (idx < 0) {
            return;
        }
        this.fCanvas.remove(this.fCanvas.item(idx));
    }
    // TODO: 演示使用
    addCircle() {
        const circle = new fabric.Circle({
            radius: 20,
            fill: 'green',
            left: 100,
            top: 100,
        });
        this.fCanvas.add(circle);
        this.fCanvas.renderAll();
    }
    // TODO: 演示使用
    addRect() {
        const rect = new fabric.Rect({
            width: 100,
            height: 100,
            left: 300,
            top: 200,
            fill: 'purple',
        });
        // rect.set('angle', 45);
        rect.animate('left', '+=100', { onChange: this.fCanvas.renderAll.bind(this.fCanvas) });
        rect.animate('angle', 145, {
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce,
            onChange: this.fCanvas.renderAll.bind(this.fCanvas),
        });
        this.fCanvas.add(rect);
    }
    // 添加一个SVG 对象
    addImageFromSvg(options) {
        if (!options.svgEle) {
            return null;
        }
        const callback = options.callback || (() => { });
        return fabric.Image.fromElement(options.svgEle, options.opt, callback);
    }
    /**
     * 添加图片对象
     *
     * @param {*} options
     * @returns
     * @memberof Board
     */
    addImage(options) {
        const opts = {
            filters: [
                {
                    name: 'BaseFilter',
                    params: {},
                },
            ],
            crossOrigin: 'anonymous',
            onCreate: () => { },
            opt: {},
            ...options,
        };
        if (!opts.url) {
            return null;
        }
        return fabric.Image.fromURL(opts.url, img => {
            if (opts.onCreate(img, this.fCanvas) === false) {
                return;
            }
            opts.filters.forEach(v => {
                // 默认配置
                const val = {
                    noise: 300,
                    blur: 0.1,
                    brightness: 0.05,
                    contrast: 40,
                    rotation: -0.5,
                    blocksize: 8,
                    threshold: 0.2,
                    saturation: 100,
                    ...v.params,
                };
                if (typeof (img.filters) !== "undefined") {
                    img.filters.push(new fabric.Image.filters[v.name](val));
                }
            });
            img.applyFilters();
            this.fCanvas.add(img);
        }, {
            ...opts.opt,
            crossOrigin: opts.crossOrigin,
        });
    }
    /**
     * 获取当前画板所有对象
     *
     * @param {string} type 指定的类型 可以为空
     * @returns {Array}
     * @memberof Board
     */
    getAllObjects(type) {
        return this.fCanvas.getObjects(type);
    }
    /**
     * 根据传入的type类型，生成绘制实例
     *
     * @param {Object} conf
     * @returns
     * @memberof Board
     */
    getDrawInstance(conf) {
        if (!conf || !conf.type || !conf.data) {
            return null;
        }
        const klassName = getFabricClass(conf.type);
        if (!klassName) {
            return null;
        }
        return new Promise(reslove => {
            // const newPath = null;
            const newConf = {
                ...conf,
            };
            // if (newConf.data) {
            //     const newPos = fabric.util.transformPoint(
            //         new fabric.Point(newConf.data.left, newConf.data.top),
            //         this.fCanvas.viewportTransform,
            //     );
            //     instance.top = newP.y;
            //     instance.left = newP.x;
            //     newConf.data.top = newPos.y;
            //     newConf.data.left = newPos.x;
            //     eslint-disable-next-line prefer-destructuring
            //     newConf.data.scaleX = this.fCanvas.viewportTransform[0];
            //     eslint-disable-next-line prefer-destructuring
            //     newConf.data.scaleY = this.fCanvas.viewportTransform[0];
            // }
            fabric[klassName].fromObject(newConf.data, instance => {
                reslove(instance);
            });
        });
    }
    /**
     * 从当前对象获取，fabric 实例
     *
     * @param {*} obj
     * @memberof Board
     */
    getInstancFromObject(obj) {
        return new Promise((resolve, reject) => {
            if (!obj || !obj.type) {
                reject(new Error('obj 不是有效的参数'));
            }
            const kls = obj.type[0].toUpperCase() + obj.type.substr(1);
            if (fabric[kls] && fabric[kls].fromObject) {
                fabric[kls].fromObject(obj, instance => {
                    resolve(instance);
                });
            }
            else {
                resolve(null);
            }
        });
    }
    loadFromJSON(json) {
        this.fCanvas.loadFromDatalessJSON(json[0], this.fCanvas.renderAll.bind(this.fCanvas));
    }
    setZoom(zoom) {
        if (typeof zoom !== 'number') {
            return;
        }
        this.fCanvas.setZoom(zoom);
    }
    resetBoard() {
        this.fCanvas.clear();
    }
    cleanBoard() {
        this.fCanvas.clearContext();
    }
    setFreeDrawMode(mode) {
        if (mode) {
            this.mouseDraw.freeDrawControll.startDraw();
        }
        else {
            this.mouseDraw.freeDrawControll.endDraw();
        }
    }
    setFreeDrawColor(color) {
        this.mouseDraw.freeDrawControll.setPenColor(color);
    }
    setFreeDrawWidth(width) {
        this.mouseDraw.freeDrawControll.setPenWidth(width);
    }
    getFreeDrawColor() {
        return this.mouseDraw.freeDrawControll.getPenColor();
    }
    getFreeDrawWidth() {
        return this.mouseDraw.freeDrawControll.getPenWidth();
    }
    // 设置绘画类型
    setDrawType(type) {
        if (!checkDrawType(type)) {
            return;
        }
        this.drawType = type;
        this.mouseDraw.updateDrawType(type);
    }
    destory() {
        this.collections = [];
        // this._dexporseEvent();
        this.fCanvas.dispose();
    }
}
Board.DRAW_TYPE = DRAW_TYPE$1;
Board.util = util;

export default Board;
export { DRAW_TYPE$1 as DRAW_TYPE };
//# sourceMappingURL=index.js.map
