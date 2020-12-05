/*!
 * @mrjl/utils v0.4.1
 * (c) wusongbo <camelwu963@126.com>
 * Released under the ISC License.
 */
/**
 * 遍历对象的可枚举属性。若遍历函数返回 `false`，遍历会提前退出。
 *
 * 注：基于你传入的 `obj`，遍历函数中 `key` 的类型可能为 `number`，
 * 但在运行时，`key` 始终为 `string`，
 * 因此，你应该始终把 `key` 当作 `string` 处理。
 * （为什么会这样？https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208）
 *
 * @param obj 要遍历的对象
 * @param traverse 遍历函数
 * @example
 * ```ts
 * forOwn(
 *   { x: '1', y: 2 },
 *   (value, key) => {
 *     console.log(key, value)
 *   }
 * )
 * ```
 */
function forOwn(obj, traverse) {
  for (var key in obj) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (traverse(obj[key], key, obj) === false) {
        break;
      }
    }
  }
}

/**
 * 分配来源对象的可枚举属性到目标对象上。
 *
 * 来源对象的应用规则是从左到右，随后的下一个对象的属性会覆盖上一个对象的属性。
 *
 * @param target 目标对象
 * @param sources 来源对象序列
 * @returns 返回扩展后的目标对象
 * @example
 * ```ts
 * assign(
 *   {},
 *   { x: 1 },
 *   { y: 2 },
 *   { x: 5, z: 9 },
 * )
 * // => { x: 5, y: 2, z: 9 }
 * ```
 */

function assign(target) {
  var sources = [], len = arguments.length - 1;
  while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

  // 使用 Object['assign'] 防止替换
  if (Object['assign']) {
    return Object['assign'].apply(Object, [ target ].concat( sources ));
  }

  for (var i = 0, list = sources; i < list.length; i += 1) {
    var source = list[i];

    forOwn(source, function (value, key) {
      target[key] = value;
    });
  }

  return target;
}

var store = Object.create(null);
/**
 * 获取全局对象。
 *
 * @returns 返回全局对象
 * @example
 * ```ts
 * // 浏览器中
 * getGlobal() // => window
 * // Node 中
 * getGlobal() // => global
 * ```
 */

function getGlobal() {
  if (store.getGlobal == null) {
    store.getGlobal = inBrowser() ? window : typeof global === 'object' ? global // see: https://stackoverflow.com/a/6930376
    // eslint-disable-next-line
    : Function('return this')() || (0, eval)('this') || {};
  }

  return store.getGlobal;
}
/* istanbul ignore next */

getGlobal.clearCache = function () {
  delete store.getGlobal;
};
/**
 * 检查是否在浏览器环境中。
 *
 * @param callback 在浏览器环境中执行的回调
 * @returns 在浏览器环境中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * // 浏览器中
 * inBrowser() // => true
 * inBrowser(
 *   () => console.log('你在浏览器中'),
 * )
 * ```
 */


function inBrowser(callback) {
  if (store.inBrowser === undefined) {
    store.inBrowser = typeof window === 'object' && typeof document === 'object' && document.nodeType === 9;
  }

  if (store.inBrowser && typeof callback === 'function') {
    callback();
  }

  return store.inBrowser;
}
/* istanbul ignore next */

inBrowser.clearCache = function () {
  delete store.inBrowser;
};
/**
 * 检查是否在 `Node` 环境中。
 *
 * @param callback 在 `Node` 环境中执行的回调
 * @returns 在 `Node` 环境中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * // Node 中
 * inNode() // => true
 * inNode(
 *   () => console.log('你在 Node 中'),
 * )
 * ```
 */


function inNode(callback) {
  if (store.inNode === undefined) {
    store.inNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
  }
  /* istanbul ignore if */


  if (store.inNode && typeof callback === 'function') {
    callback();
  }

  return store.inNode;
}
/* istanbul ignore next */

inNode.clearCache = function () {
  delete store.inNode;
};
/**
 * 检查是否在微信小程序环境中。
 *
 * @param callback 在微信小程序环境中执行的回调
 * @returns 在微信小程序环境中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * // 微信小程序中
 * inWechatMiniProgram() // => true
 * inWechatMiniProgram(
 *   () => console.log('你在微信小程序中'),
 * )
 * ```
 */


function inWechatMiniProgram(callback) {
  if (store.inWechatMiniProgram === undefined) {
    store.inWechatMiniProgram = typeof wx === 'object' && wx !== null && typeof wx.getSystemInfo === 'function';
  }
  /* istanbul ignore if */


  if (store.inWechatMiniProgram && typeof callback === 'function') {
    callback();
  }

  return store.inWechatMiniProgram;
}

inWechatMiniProgram.clearCache = function () {
  delete store.inWechatMiniProgram;
};
/**
 * 检查是否在微信浏览器环境中。
 *
 * @param callback 在微信浏览器环境中执行的回调
 * @returns 在微信浏览器环境返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * // 微信浏览器中
 * inWechatWebview() // => true
 * inWechatWebview(
 *   () => console.log('你在微信浏览器中'),
 * )
 * ```
 */


function inWechatWebview(callback) {
  if (store.inWechatWebview === undefined) {
    store.inWechatWebview = inBrowser() && /micromessenger/.test(navigator.userAgent.toLowerCase());
  }
  /* istanbul ignore if */


  if (store.inWechatWebview && typeof callback === 'function') {
    callback();
  }

  return store.inWechatWebview;
}

inWechatWebview.clearCache = function () {
  delete store.inWechatWebview;
};
/**
 * 检查是否在 `iOS` 设备中。
 *
 * @param callback 在 `iOS` 设备中执行的回调
 * @returns 在 `iOS` 设备中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * // iOS 设备中
 * inIOS() // => true
 * inIOS(
 *   () => console.log('你在 iOS 设备中'),
 * )
 * ```
 */


function inIOS(callback) {
  if (store.inIOS === undefined) {
    store.inIOS = inBrowser() && !!navigator.platform && /iPad|iPhone|iPod/i.test(navigator.platform);
  }
  /* istanbul ignore if */


  if (store.inIOS && typeof callback === 'function') {
    callback();
  }

  return store.inIOS;
}

inIOS.clearCache = function () {
  delete store.inIOS;
};
/**
 * 检查是否在 `Android` 设备中。
 *
 * @param callback 在 `Android` 设备中执行的回调
 * @returns 在 `Android` 设备中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * // Android 设备中
 * inAndroid() // => true
 * inAndroid(
 *   () => console.log('你在 Android 设备中'),
 * )
 * ```
 */


function inAndroid(callback) {
  if (store.inAndroid === undefined) {
    store.inAndroid = inBrowser() && !!navigator.userAgent && /Android/i.test(navigator.userAgent);
  }
  /* istanbul ignore if */


  if (store.inAndroid && typeof callback === 'function') {
    callback();
  }

  return store.inAndroid;
}

inAndroid.clearCache = function () {
  delete store.inAndroid;
};

/**
 * 检测 `value` 的类型。
 *
 * @param value 要检测的值
 * @returns 返回检测值的类型
 * @see https://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring
 * @see https://www.ecma-international.org/ecma-262/5.1/#sec-8.6.2
 * @example
 * ```ts
 * getType(1) // => 'Number'
 * getType(true) // => 'Boolean'
 * getType([]) // => 'Array'
 * getType(/hello/) // => 'RegExp'
 * ```
 */
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

/**
 * 立即调用函数并返回其返回值。
 *
 * 注：`ii = immediately invoke`
 *
 * @param fn 要调用的函数
 * @returns 返回被调用函数的返回值
 * @example
 * ```ts
 * ii(() => 1) // => 1
 * ```
 */
function ii(fn) {
  return fn();
}

/**
 * 检查 `value` 是否是一个数组。
 *
 * @param value 要检查的值
 * @returns `value` 是数组返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isArray(['x']) // => true
 * isArray('x') // => false
 * ```
 */

function isArray(value) {
  return Array.isArray(value);
}
/**
 * 检查 `value` 是否是一个布尔值。
 *
 * @param value 要检查的值
 * @returns `value` 是布尔值返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isBoolean(true) // => true
 * isBoolean(false) // => true
 * isBoolean('true') // => false
 * ```
 */

function isBoolean(value) {
  return typeof value === 'boolean';
}
/**
 * 检查 `value` 是否是合法的中国大陆居民 `18` 位身份证号码。
 *
 * @param value 要检查的值
 * @returns `value` 是合法的中国大陆居民 `18` 位身份证号码返回 `true`，否则返回 `false`
 * @see https://my.oschina.net/labrusca/blog/306116
 * @see http://developer.51cto.com/art/201803/568755.htm
 * @example
 * ```ts
 * isChineseIDCardNumber('123456') // => false
 * ```
 */

function isChineseIDCardNumber(value) {
  var testRegExp = /^[1-9]([0-9]{14}|[0-9]{16}[0-9Xx])$/;
  var areaMap = [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82];
  var weightMap = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var codeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  var isValidDate = function (year, month, day) {
    var date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day && date.getTime() < new Date().getTime() && year > 1900;
  };

  var len = value.length; // 长度错误

  if (len !== 15 && len !== 18) {
    return false;
  } // 模式校验


  if (!testRegExp.test(value)) {
    return false;
  } // 地区校验


  if (areaMap.indexOf(+value.substr(0, 2)) === -1) {
    return false;
  } // 15 位


  if (len === 15) {
    return isValidDate(+("19" + (value.substr(6, 2))), +value.substr(8, 2), +value.substr(10, 2));
  } // 18 位


  if (!isValidDate(+value.substr(6, 4), +value.substr(10, 2), +value.substr(12, 2))) {
    return false;
  } // 校验码


  var sum = value.split('').slice(0, 17).reduce(function (s, num, index) {
    s += +num * weightMap[index];
    return s;
  }, 0);
  return codeMap[sum % 11] === value[17].toUpperCase();
}
/**
 * 检测 `number` 是否可能是中国的手机号码。
 *
 * @param number 要检测的号码
 * @returns `number` 可能是中国的手机号码返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isPossibleChineseMobilePhoneNumber(18000030000) // => true
 * isPossibleChineseMobilePhoneNumber(10086) // => false
 * ```
 */

function isPossibleChineseMobilePhoneNumber(number) {
  return /^1[3-9][0-9]{9}$/.test(String(number));
}
/**
 * 检测 `value` 是否可能是中国人的姓名，支持少数名族姓名中间的 `·` 号。
 *
 * @param value 要检测的值
 * @returns `value` 可能是中国人的姓名返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isPossibleChineseName('鲁') // => false
 * isPossibleChineseName('鲁迅') // => true
 * isPossibleChineseName('买买提·吐尔逊') // => true
 * ```
 */

function isPossibleChineseName(value) {
  return !!value && value.length > 1 && value.length < 20 && value[0] !== '\u00B7' && value.indexOf('\u00B7\u00B7') === -1 && isHan(value.replace(/\u00B7/g, ''));
}
/**
 * 检查 `value` 是否是一个日期。
 *
 * @param value 要检查的值
 * @returns `value` 是日期返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isDate(new Date()) // => true
 * ```
 */

function isDate(value) {
  return getType(value) === 'Date';
}
/**
 * 检查 `value` 是否是一个邮件地址。
 *
 * @param value 要检查的值
 * @returns `value` 是邮件地址返回 `true`，否则返回 `false`
 * @see http://emailregex.com/
 * @example
 * ```ts
 * isEmail('hello@foo.bar') // => true
 * isEmail('hello@foo') // => false
 * ```
 */

function isEmail(value) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
}
/**
 * 检查 `value` 是否是空值，包括：`undefined`、`null`、`''`、`false`、`true`、`[]`、`{}`。
 *
 * @param value 要检查的值
 * @returns `value` 是空值返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isEmpty(undefined) // => true
 * isEmpty(null) // => true
 * isEmpty('') // => true
 * isEmpty(false) // => true
 * isEmpty(true) // => true
 * isEmpty([]) // => true
 * isEmpty({}) // => true
 * ```
 */

function isEmpty(value) {
  return [undefined, null, '', false, true].some(function (item) { return item === value; }) || Array.isArray(value) && value.length === 0 || isPlainObject(value) && ii(function () {
    for (var _ in value) {
      return false;
    }

    return true;
  });
}
/**
 * 检查给定的数组的各项是否相等。
 *
 * @param arrs 要检查的数组
 * @returns 给定的数组的各项都相等返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isEqualArray([1], [1]) // => true
 * isEqualArray([1], [5]) // => false
 * ```
 */

function isEqualArray() {
  var arrs = [], len = arguments.length;
  while ( len-- ) arrs[ len ] = arguments[ len ];

  for (var i = 0; i < arrs.length; i++) {
    if (!Array.isArray(arrs[i])) {
      return false;
    }

    if (arrs[i] === arrs[0]) {
      continue;
    }

    if (arrs[i].length !== arrs[0].length) {
      return false;
    }

    for (var j = 0; j < arrs[i].length; j++) {
      if (arrs[i][j] !== arrs[0][j]) {
        return false;
      }
    }
  }

  return true;
}
/**
 * 检查 `value` 是否是原始有限数值。
 *
 * @param value 要检查的值
 * @returns `value` 是原始有限数值返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isFinite(1) // => true
 * isFinite(Infinity) // => false
 * ```
 */

function isFinite(value) {
  return Number.isFinite(value);
}
/**
 * 检查 `value` 是否是一个函数。
 *
 * @param value 要检查的值
 * @returns `value` 是函数返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isFunction(() => {}) // => true
 * isFunction(2000) // => false
 * ```
 */

function isFunction(value) {
  return typeof value === 'function';
}
/**
 * 检查 `value` 是否全是汉字。
 *
 * @param value 要检查的值
 * @returns `value` 全是汉字返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isHan('hello') // => false
 * isHan('嗨咯') // => true
 * ```
 */

function isHan(value) {
  // https://mothereff.in/regexpu#input=const+regex+%3D+%2F%5E%5Cp%7BScript%3DHan%7D%2B%24%2Fu%3B&unicodePropertyEscape=1
  var re =
  /* /^\p{Script=Han}+$/u */
  /^(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FEF\uF900-\uFA6D\uFA70-\uFAD9]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D])+$/;
  return re.test(value);
}
/**
 * 检查 `value` 是否是一个整数。
 *
 * @param value 要检查的值
 * @returns `value` 是整数返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isInteger(1) // => true
 * isInteger(1.2) // => false
 * isInteger(-1) // => true
 * ```
 */

function isInteger(value) {
  return Number.isInteger(value);
}
/**
 * 检查 `value` 是否是一个正整数。
 *
 * @param value 要检查的值
 * @returns `value` 是正整数返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isPositiveInteger(1) // => true
 * isPositiveInteger(-1) // => false
 * ```
 */

function isPositiveInteger(value) {
  return value > 0 && isInteger(value);
}
/**
 * 检查 `value` 是否是一个负整数。
 *
 * @param value 要检查的值
 * @returns `value` 是负整数返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNegativeInteger(-1) // => true
 * isNegativeInteger(1) // => false
 * ```
 */

function isNegativeInteger(value) {
  return value < 0 && isInteger(value);
}
/**
 * 检查 `value` 是否是 `NaN`。
 *
 * @param value 要检查的值
 * @returns `value` 是 `NaN` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNaN(NaN) // => true
 * isNaN(2) // => false
 * ```
 */

function isNaN(value) {
  return value !== value;
}
/**
 * 检查 `value` 是否是 `null` 或 `undefined`。
 *
 * @param value 要检查的值
 * @returns `value` 是 `null` 或 `undefined` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNil(null) // => true
 * isNil(undefined) // => true
 * ```
 */

function isNil(value) {
  return value == null;
}
/**
 * 检查 `value` 是否是 `null`。
 *
 * @param value 要检查的值
 * @returns `value` 是 `null` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNull(null) // => true
 * ```
 */

function isNull(value) {
  return value === null;
}
/**
 * 检查 `value` 是否是一个数字。
 *
 * 注：`NaN` 不被认为是数字。
 *
 * @param value 要检查的值
 * @returns `value` 是数字返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNumber(1) // => true
 * isNumber(0.1) // => true
 * isNumber(NaN) // => false
 * ```
 */

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}
/**
 * 检查 `value` 是否是一个数值。
 *
 * 注：`Infinity`、`-Infinity`、`NaN` 不被认为是数值。
 *
 * @param value 要检查的值
 * @returns `value` 是数值返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNumeric(1) // => true
 * isNumeric('1') // => true
 * ```
 */

function isNumeric(value) {
  return value != null && !(getGlobal().isNaN || isNaN)(value - parseFloat(value));
}
/**
 * 检查 `value` 是否是一个对象。
 *
 * @param value 要检查的值
 * @returns `value` 是对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isObject({}) // => true
 * isObject(() => {}) // => true
 * isObject(null) // => false
 * ```
 */

function isObject(value) {
  var type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}
/**
 * 检查 `value` 是否是一个普通对象。
 *
 * @param value 要检查的值
 * @returns `value` 是普通对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isPlainObject({}) // => true
 * isPlainObject(Object.create(null)) // => true
 * isPlainObject(() => {}) // => false
 * ```
 */

function isPlainObject(value) {
  if (!value || typeof value !== 'object') {
    return false;
  }

  var proto = Object.getPrototypeOf(value);

  if (proto === null) {
    return true;
  }

  var Ctor = proto.constructor;
  return typeof Ctor === 'function' && Ctor instanceof Ctor;
}
/**
 * 检查 `value` 是否像 `Promise`。
 *
 * @param value 要检查的值
 * @returns `value` 像 `Promise` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isPromiseLike(Promise.resolve()) // => true
 * ```
 */

function isPromiseLike(value) {
  return isObject(value) && typeof value.then === 'function';
}
/**
 * 检查 `value` 是否是一个正则对象。
 *
 * @param value 要检查的值
 * @returns `value` 是正则对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isRegExp(/hello/) // => true
 * isRegExp(new RegExp('hello')) // => true
 * ```
 */

function isRegExp(value) {
  return getType(value) === 'RegExp';
}
/**
 * 检查 `value` 是否是一个字符串。
 *
 * @param value 要检查的值
 * @returns `value` 是字符串返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isString('') // => true
 * isString('hello') // => true
 * ```
 */

function isString(value) {
  return typeof value === 'string';
}
/**
 * 检查 `value` 是否等于 `undefined`。
 *
 * @param value 要检查的值
 * @returns `value` 是 `undefined` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isUndefined(undefined) // => true
 * isUndefined(void 0) // => true
 * ```
 */

function isUndefined(value) {
  return value === undefined;
}
/**
 * 检查 `value` 是否是一个有效的网址，仅支持 `http`、`https` 协议，支持 `IP` 域名。
 *
 * @param value 要检查的值
 * @returns `value` 是有效的网址返回 `true`，否则返回 `false`
 * @see http://urlregex.com/
 * @example
 * ```ts
 * isUrl('http://foo.bar') // => true
 * isUrl('https://foo.bar/home') // => true
 * ```
 */

function isUrl(value) {
  // http://urlregex.com/ ==> Ruby
  var re = /^(?:(?:https?):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
  return re.test(value);
}
/**
 * 检查 `value` 是否是一个 `arguments` 对象。
 *
 * @param value 要检查的值
 * @returns `value` 是 `arguments` 对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * function myFunction() {
 *   console.log(isArguments(arguments)) // true
 * }
 * ```
 */

function isArguments(value) {
  return getType(value) === 'Arguments';
}

/**
 * 将 `arr` 拆分成多个 `size` 长度的区块，并将它们组合成一个新数组返回。
 *
 * 如果 `arr` 无法等分，且设置了 `filler` 函数，剩余的元素将被 `filler` 函数的返回值填充。
 *
 * @param arr 要处理的数组
 * @param size 每个区块的长度
 * @param filler 返回填充物的函数，其接收当前填充物的索引，即第几个填充物（从 `0` 开始），并返回填充物
 * @returns 返回拆分后的新数组
 * @example
 * ```ts
 * const arr = [1, 2, 3, 4, 5, 6]
 * chunk(arr, 2) // => [[1, 2], [3, 4], [5, 6]]
 * chunk(arr, 3) // => [[1, 2, 3], [4, 5, 6]]
 * chunk(arr, 4) // => [[1, 2, 3, 4], [5, 6]]
 * chunk(arr, 4, index => index) // => [[1, 2, 3, 4], [5, 6, 0, 1]]
 * ```
 */

function chunk(arr, size, filler) {
  if (!isPositiveInteger(size)) {
    throw new RangeError('size 应为正整数');
  }

  if (arr.length === 0) {
    return [];
  }

  var result = [];
  var rows = Math.ceil(arr.length / size);

  for (var i = 0; i < rows; i++) {
    result.push(arr.slice(i * size, (i + 1) * size));
  }

  var lastRow = result[rows - 1];

  if (arguments.length === 3 && lastRow.length < size) {
    var fillerIsFunction = isFunction(filler);

    for (var i$1 = 0, len = size - lastRow.length; i$1 < len; i$1++) {
      lastRow.push(fillerIsFunction ? filler(i$1) : filler);
    }
  }

  return result;
}

/**
 * 转义正则表达式中的特殊字符。
 *
 * @param str 要转换的字符串
 * @returns 返回转换后的字符串
 * @example
 * ```ts
 * escapeRegExp('github.com') // => 'github\\.com'
 * ```
 */
function escapeRegExp(str) {
  str = String(str);
  var re = /[\\^$.*+?()[\]{}|]/g;
  var hasRe = new RegExp(re.source);
  return str && hasRe.test(str) ? str.replace(re, '\\$&') : str;
}

/**
 * 获取链接的绝对地址。
 *
 * @param url 链接
 * @returns 返回绝对地址
 */
function getAbsoluteUrl(url) {
  if (typeof URL !== 'undefined') {
    return new URL(url, ("" + (location.protocol) + (location.host))).href;
  }

  if (!getAbsoluteUrl.anchorElement) {
    getAbsoluteUrl.anchorElement = document.createElement('a');
  }

  getAbsoluteUrl.anchorElement.href = url;
  return getAbsoluteUrl.anchorElement.href;
}
getAbsoluteUrl.anchorElement = null;

/**
 * 根据 `iteratee` 返回的值对 `data` 进行分组。
 *
 * @param data 要分组的数据
 * @param iteratee 迭代函数
 * @returns 返回分组结果
 * @example
 * ```ts
 * groupBy(
 *   [
 *     { type: 1, name: '石头' },
 *     { type: 3, name: '花生' },
 *     { type: 2, name: '鲸鱼' },
 *     { type: 1, name: '树木' },
 *     { type: 2, name: '鲨鱼' },
 *   ],
 *   item => item.type,
 * )
 * // => {
 * // =>   1: [
 * // =>     { type: 1, name: '石头' },
 * // =>     { type: 1, name: '树木' },
 * // =>   ],
 * // =>   2: [
 * // =>     { type: 2, name: '鲸鱼' },
 * // =>     { type: 2, name: '鲨鱼' },
 * // =>   ],
 * // =>   3: [
 * // =>     { type: 3, name: '花生' },
 * // =>   ],
 * // => }
 * ```
 */
function groupBy(data, iteratee) {
  return data.reduce(function (res, item, index) {
    var key = iteratee(item, index, data);

    if (!res[key]) {
      res[key] = [];
    }

    res[key].push(item);
    return res;
  }, {});
}

/**
 * 检查 `key` 是否是对象 `obj` 自身的属性。
 *
 * @param obj 要检查的对象
 * @param key 要检查的键
 * @returns `key` 是 `obj` 自身的属性返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * const obj = { x: 1, 2: 'y' }
 * has(obj, 'x') // => true
 * has(obj, 2) // => true
 * has(obj, 'toString') // => false
 * ```
 */
function has(obj, key) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 *
 * @desc 判断两个数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 */

function arrayEqual(arr1, arr2) {
  if (arr1 === arr2) { return true; }
  if (arr1.length !== arr2.length) { return false; }

  for (var i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) { return false; }
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
  return new RegExp(("(\\s|^)" + cls + "(\\s|$)")).test(ele.className);
}
/**
 *
 * @desc   为元素添加class
 * @param  {HTMLElement} ele
 * @param  {String} cls
 */

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className += " " + cls;
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
    var reg = new RegExp(("(\\s|^)" + cls + "(\\s|$)"));
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
  var arr = document.cookie.replace(/\s/g, "").split(";");

  for (var i = 0; i < arr.length; i++) {
    var tempArr = arr[i].split("=");

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
  var date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = name + "=" + value + ";expires=" + date;
}
/**
 *
 * @desc 获取浏览器类型和版本
 * @return {String}
 */

function getExplore() {
  var sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] : (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] : (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] : (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] : (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] : (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] : (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0; // 根据关系进行判断

  if (sys.ie) { return ("IE: " + (sys.ie)); }
  if (sys.edge) { return ("EDGE: " + (sys.edge)); }
  if (sys.firefox) { return ("Firefox: " + (sys.firefox)); }
  if (sys.chrome) { return ("Chrome: " + (sys.chrome)); }
  if (sys.opera) { return ("Opera: " + (sys.opera)); }
  if (sys.safari) { return ("Safari: " + (sys.safari)); }
  return "Unknown";
}
/**
 *
 * @desc 获取操作系统类型
 * @return {String}
 */

function getOS() {
  var userAgent = "navigator" in window && "userAgent" in navigator && navigator.userAgent.toLowerCase() || ""; // let vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';

  var appVersion = "navigator" in window && "appVersion" in navigator && navigator.appVersion.toLowerCase() || "";
  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) { return "ios"; }
  if (/android/i.test(userAgent)) { return "android"; }
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) { return "windowsPhone"; }
  if (/mac/i.test(appVersion)) { return "MacOSX"; }
  if (/win/i.test(appVersion)) { return "windows"; }
  if (/linux/i.test(appVersion)) { return "linux"; }
  return "Unknown";
}
/**
 * 生成一个UID，保证同一时刻生成的值，不同即可，只能用于单机，
 * 不能用来共享，比如：当前生成的ID存到服务器上，会存在重复的风险
 */

function getUId() {
  var resAry = Array(4);
  var currentTime = new Date().getTime();
  var uidAry = resAry.map(function () {
    // eslint-disable-next-line no-bitwise
    return ("" + (Math.random() * 16 | 0));
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
  var zoom = window.zoom || 1;
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
  var timeout;
  return function executedFunction() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var context = this; // eslint-disable-next-line prefer-rest-params
    // const args: any[] = args;

    var later = function () {
      timeout = null;
      if (!immediate) { func.apply(context, args); }
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) { func.apply(context, args); }
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
  var pos = {
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

  var diff = to - getScrollTop();
  if (diff === 0) { return; }
  var step = diff / duration * 10;
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
  var clientHeight = window.innerHeight;
  downCb = typeof downCb === "function" ? downCb : function () {};
  upCb = typeof upCb === "function" ? upCb : function () {};
  window.addEventListener("resize", function () {
    var height = window.innerHeight;

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
  var this$1 = this;

  var timeout;
  var context;
  var args;
  var result;
  var previous = 0; // eslint-disable-next-line no-param-reassign

  if (!options) { options = {}; }

  var later = function () {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);

    if (!timeout) {
      context = null;
      args = null;
    }
  };

  var throttled = function () {
    var targs = [], len = arguments.length;
    while ( len-- ) targs[ len ] = arguments[ len ];

    // let now = Date.now()||new Date().getTime();
    var tnow = now();
    if (!previous && options.leading === false) { previous = tnow; }
    var remaining = wait - (tnow - previous); // @ts-ignore

    context = this$1; // eslint-disable-next-line prefer-rest-params

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

  throttled.cancel = function () {
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
  var keyCodeMap = {
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

  console.log(("Unknow Key(Key Code:" + keycode + ")"));
  return "";
}
/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 * @return {Any}
 */

function deepClone(values) {
  var copy; // Handle the 3 simple types, and null or undefined

  if (values == null || typeof values !== "object") { return values; } // Handle Date

  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  } // Handle Array


  if (values instanceof Array) {
    copy = [];

    for (var i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i]);
    }

    return copy;
  } // Handle Object


  if (values instanceof Object) {
    copy = {};

    for (var attr in values) {
      if (values.hasOwnProperty(attr)) { copy[attr] = deepClone(values[attr]); }
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
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) { return false; }
  return !Object.keys(obj).length;
}
/**
 *
 * @desc 随机生成颜色
 * @return {String}
 */

function randomColor() {
  return ("#" + (("00000" + ((Math.random() * 0x1000000 << 0).toString(16))).slice(-6)));
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
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */

function isIdCard(str) {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
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
 * @desc   现金额转大写
 * @param  {Number} n
 * @return {String}
 */

function digitUppercase(n) {
  var fraction = ["角", "分"];
  var digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  var unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
  var head = n < 0 ? "欠" : "";
  n = Math.abs(n);
  var s = "";

  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, "");
  }

  s = s || "整";
  n = Math.floor(n);

  for (var i$1 = 0; i$1 < unit[0].length && n > 0; i$1++) {
    var p = "";

    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }

    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i$1] + s;
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
  var aftertime = Date.parse(new Date(startTime).toISOString());
  var currentTime = Date.parse(new Date().toISOString());
  var time = currentTime - aftertime;
  var day = parseInt(("" + (time / (1000 * 60 * 60 * 24))));
  var hour = parseInt(("" + (time / (1000 * 60 * 60))));
  var min = parseInt(("" + (time / (1000 * 60))));
  var month = parseInt(("" + (day / 30)));
  var year = parseInt(("" + (month / 12)));
  if (year) { return (year + "年前"); }
  if (month) { return (month + "个月前"); }
  if (day) { return (day + "天前"); }
  if (hour) { return (hour + "小时前"); }
  if (min) { return (min + "分钟前"); }
  return "刚刚";
}
/**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */

function formatRemainTime(endTime) {
  var startDate = new Date(); // 开始时间

  var endDate = new Date(endTime); // 结束时间

  var t = endDate.getTime() - startDate.getTime(); // 时间差

  var d = 0;
  var h = 0;
  var m = 0;
  var s = 0;

  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);
  }

  return (d + "天 " + h + "小时 " + m + "分钟 " + s + "秒");
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

  var date1_year = date1.getFullYear();
  var date1_month = date1.getMonth() + 1;
  var date1_date = date1.getDate();
  var date2_year = date2.getFullYear();
  var date2_month = date2.getMonth() + 1;
  var date2_date = date2.getDate();
  return date1_date === date2_date && date1_month === date2_month && date1_year === date2_year;
}
/**
 * @desc 获取指定日期月份的总天数
 * @param {Date} time
 * @return {Number}
 */

function monthDays(date) {
  var time = new Date(date);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
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

  var startDate;
  var endDate;

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

  var t = endDate.getTime() - startDate.getTime();
  var d = 0;
  var h = 0;
  var m = 0;
  var s = 0;

  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);
  }

  return {
    d: d,
    h: h,
    m: m,
    s: s
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
  var queryWithoutStart = query.indexOf("?") === 0 ? query.substring(1) : query;
  var uaFormated = {};
  var strs = queryWithoutStart.split("&");

  for (var querySingle in strs) {
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
  if (!obj) { return ""; }
  var pairs = [];

  for (var key in obj) {
    var value = obj[key];

    if (value instanceof Array) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(((encodeURIComponent((key + "[" + i + "]"))) + "=" + (encodeURIComponent(value[i]))));
      }

      continue;
    }

    pairs.push(((encodeURIComponent(key)) + "=" + (encodeURIComponent(obj[key]))));
  }

  return pairs.join("&");
}
/**
 * @description base64转blob
 * @param urlData base64编码
 */

function convertBase64UrlToBlob(urlData) {
  var arr = urlData.split(",");
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);

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
    var r = Math.random() * 16 | 0;
    var v = c == "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
/**
 *
 * @desc   获取浏览器信息
 * @return  {Object} obj
 */

function getBrowser() {
  var Sys = {
    name: "",
    ver: ""
  };
  var ua = navigator.userAgent.toLowerCase();
  var re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
  var m = ua.match(re);

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
    Sys: Sys,
    info: ua
  };
}
/**
 *
 * @desc   获取系统名称和版本号
 * @return {String} example: mac68k win7
 */

function checkOS() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var sPlatform = navigator.platform.toLowerCase();
  var isWin = sPlatform === "win32" || sPlatform === "windows";
  var isMac = sPlatform === "mac68k" || sPlatform === "macppc" || sPlatform === "macintosh" || sPlatform === "macintel";
  var isUnix = sPlatform === "x11" && !isWin && !isMac;
  var isLinux = String(sPlatform).indexOf("linux") > -1;
  if (isMac) { return "MAC"; }
  if (isUnix) { return "Unix"; }
  if (isLinux) { return "Linux"; }

  if (isWin) {
    var isWin2K = sUserAgent.indexOf("windows nt 5.0") > -1 || sUserAgent.indexOf("windows 2000") > -1;
    if (isWin2K) { return "Win2000"; }
    var isWinXP = sUserAgent.indexOf("windows nt 5.1") > -1 || sUserAgent.indexOf("windows xp") > -1;
    if (isWinXP) { return "WinXP"; }
    var isWin2003 = sUserAgent.indexOf("windows nt 5.2") > -1 || sUserAgent.indexOf("windows 2003") > -1;
    if (isWin2003) { return "Win2003"; }
    var isWinVista = sUserAgent.indexOf("windows nt 6.0") > -1 || sUserAgent.indexOf("windows vista") > -1;
    if (isWinVista) { return "WinVista"; }
    var isWin7 = sUserAgent.indexOf("windows nt 6.1") > -1 || sUserAgent.indexOf("windows 7") > -1;
    if (isWin7) { return "Win7"; }
    var isWin8 = sUserAgent.indexOf("windows nt 6.2") > -1 || sUserAgent.indexOf("windows nt 6.3") > -1 || sUserAgent.indexOf("windows 8") > -1;
    if (isWin8) { return "Win8"; }
    var isWin10 = sUserAgent.indexOf("windows nt 10") > -1 || sUserAgent.indexOf("windows 10") > -1;
    if (isWin10) { return "Win10"; }
  }

  return "other";
}
/**
 *
 * @desc   从sessionStorage获取UserId，如无根据ISO时间戳生成
 * @return {String}
 */

function getUserId() {
  var userId = sessionStorage.getItem("userId");

  if (userId) {
    return userId;
  }

  var temp = Date.parse(new Date().toISOString()) % 100000000 / 1000;
  var userIdTemp = "" + (Number.parseInt(temp));
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

var buildScriptTag = function (src, attrs) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.defer = true;
  script.src = src;

  for (var attr in Object.keys(attrs)) {
    script.setAttribute(attr, attrs[attr]);
  }

  return script;
};
/**
 * @desc    异步加载script
 */


function loadScript(url, attrs) {
  if ( attrs === void 0 ) attrs = {};

  var script = buildScriptTag(url, attrs);
  var p = new Promise(function (resolve, reject) {
    script.onload = function () {
      resolve();
    };

    script.onerror = function () {
      reject();
    };
  });
  document.body.appendChild(script);
  return p;
}
var uaParsed = navigator ? parseQuery(navigator.userAgent) : {};
/**
 * @desc    系统信息判断获取
 */

var platform = {
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

export { addClass, arrayEqual, assign, checkOS, chunk, convertBase64UrlToBlob, debounce, deepClone, digitUppercase, escapeRegExp, forOwn, formatPassTime, formatPos, formatRemainTime, getAbsoluteUrl, getBrowser, getCookie, getEle, getExplore, getGlobal, getKeyName, getMacOsVersion, getOS, getScrollTop, getType, getUId, getUUID, getUserId, groupBy, has, hasClass, ii, inAndroid, inBrowser, inIOS, inNode, inWechatMiniProgram, inWechatWebview, isArguments, isArray, isBoolean, isChineseIDCardNumber, isColor, isDate, isEmail, isEmpty, isEmptyObject, isEqualArray, isFinite, isFunction, isHan, isIdCard, isInteger, isLeapYear, isNaN, isNegativeInteger, isNil, isNull, isNumber, isNumeric, isObject, isPhoneNum, isPlainObject, isPositiveInteger, isPossibleChineseMobilePhoneNumber, isPossibleChineseName, isPromiseLike, isRegExp, isSameDay, isString, isSupportWebP, isUndefined, isUrl, loadScript, monthDays, now, offset, parseQuery, platform, randomColor, randomNum, removeClass, removeCookie, scrollTo, setCookie, setScrollTop, stringfyQueryString, throttle, timeLeft, windowResize };
//# sourceMappingURL=index.esm.js.map
