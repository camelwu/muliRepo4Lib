
/**
 *
 * @desc   为元素添加class
 * @param  {HTMLElement} ele
 * @param  {String} cls
 */
export declare function addClass(ele: HTMLElement, cls: string): void;

/**
 * 任意函数类型。
 */
export declare type AnyFunction = (...args: any[]) => any;

/**
 * 任意对象类型。
 */
export declare type AnyObject = Record<keyof any, any>;

/**
 *
 * @desc 判断两个数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 */
export declare function arrayEqual(arr1: Array<any>, arr2: Array<any>): boolean;

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
export declare function assign<T extends object>(target: T, ...sources: object[]): T;

/**
 * @example
 * ```ts
 * // before
 * type X = PromiseLike<string> | string
 * // after
 * type X = AsyncOrSync<string>
 * ```
 */
export declare type AsyncOrSync<T> = PromiseLike<T> | T;

/**
 * 类似 `ReturnType`，不过会返回 `Promise<R>` 中的 `R`。
 *
 * @example
 * ```ts
 * type Result0 = ReturnType<() => Promise<number>> // => Promise<number>
 * type Result1 = AsyncReturnType<() => Promise<number>> // => number
 * ```
 */
export declare type AsyncReturnType<T extends (...args: any[]) => Promise<any>> = (T extends (...args: any[]) => Promise<infer R> ? R : any);

/**
 * 名义化类型。
 *
 * @example
 * ```ts
 * type User = { id: Brand<number, User>, name: string }
 * type Post = { id: Brand<number, Post>, title: string }
 * type UserIdIsNumber = User['id'] extends number ? true: false // => true
 * type PostIdIsNumber = Post['id'] extends number ? true: false // => true
 * type PostIdIsNotUserId = Post['id'] extends User['id'] ? false : true // => true
 * ```
 */
export declare type Brand<T, B> = T & {
    __kind__?: B;
};

/**
 *
 * @desc   获取系统名称和版本号
 * @return {String} example: mac68k win7
 */
export declare function checkOS(): "MAC" | "Unix" | "Linux" | "Win2000" | "WinXP" | "Win2003" | "WinVista" | "Win7" | "Win8" | "Win10" | "other";

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
export declare function chunk<T>(arr: T[], size: number, filler?: (index: number) => T): T[][];

/**
 * @description base64转blob
 * @param urlData base64编码
 */
export declare function convertBase64UrlToBlob(urlData: any): Blob;

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
export declare function debounce(func: () => void, wait: number, immediate: boolean): (this: any) => void;

/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 * @return {Any}
 */
export declare function deepClone(values: any): any;

/**
 * 从 `T` 中排除 `undefined` 类型。
 *
 * @example
 * ```ts
 * interface User {
 *   gender?: 'male' | 'female',
 * }
 * // before
 * type UserGender = Exclude<User['gender'], undefined>
 * // after
 * type UserGender = Defined<User['gender']>
 * ```
 */
export declare type Defined<T> = Exclude<T, undefined>;

/**
 *
 * @desc   现金额转大写
 * @param  {Number} n
 * @return {String}
 */
export declare function digitUppercase(n: number): string;

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
export declare function escapeRegExp(str: string): string;

/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {String} startTime
 * @return {String}
 */
export declare function formatPassTime(startTime: string): string;

/**
 * 根据当前选择器获取cavase元素
 *
 * @param {Number} ele
 * @return {Object} {x: Num, y: Num}
 */
export declare function formatPos(mouseX: number, mouseY: number): {
    x: number;
    y: number;
};

/**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
export declare function formatRemainTime(endTime: Date): string;

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
export declare function forOwn<T extends AnyObject>(obj: T, traverse: ForOwnTraverse<T>): void;

export declare interface ForOwnTraverse<T extends AnyObject, K extends string | number = Extract<keyof T, string | number>> {
    /**
     * 遍历函数。
     *
     * @param value 值
     * @param key 键
     * @param obj 原对象
     * @returns 返回 `false` 可提前退出遍历
     */
    (value: T[K], key: K, obj: T): any;
}

/**
 * 获取链接的绝对地址。
 *
 * @param url 链接
 * @returns 返回绝对地址
 */
export declare function getAbsoluteUrl(url: string): string;

export declare namespace getAbsoluteUrl {
    var anchorElement: HTMLAnchorElement | null;
}

/**
 *
 * @desc   获取浏览器信息
 * @return  {Object} obj
 */
export declare function getBrowser(): {
    Sys: {
        name: string;
        ver: string;
    };
    info: string;
};

/**
 *
 * @desc 根据name读取cookie
 * @param  {String} name
 * @return {String}
 */
export declare function getCookie(name: string): string;

/**
 *
 * @desc 获取元素
 * @param {string | HTMLElement} ele
 * @return {HTMLElement}
 * getEle(ele: any): Element;
 * getEle(ele: string): HTMLElement;
 * getEle(ele: "canvas"): HTMLCanvasElement;
 */
export declare function getEle(ele: any): any;

/**
 *
 * @desc 获取浏览器类型和版本
 * @return {String}
 */
export declare function getExplore(): string;

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
export declare function getGlobal(): any;

export declare namespace getGlobal {
    var clearCache: () => void;
}

/**
 * @desc 根据keycode获得键名
 * @param  {Number} keycode
 * @return {String}
 */
export declare function getKeyName(keycode: number): string;

/**
 *
 * @desc   获取Mac系统版本
 * @return {String}
 */
export declare function getMacOsVersion(): string;

/**
 *
 * @desc 获取操作系统类型
 * @return {String}
 */
export declare function getOS(): string;

/**
 *
 * @desc 获取滚动条距顶部的距离
 * @return {Number}
 */
export declare function getScrollTop(): number;

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
export declare function getType(value: any): GetTypeReturn;

export declare type GetTypeReturn = LiteralUnion<('Undefined' | 'Null' | 'Array' | 'String' | 'Arguments' | 'Function' | 'Error' | 'Boolean' | 'Number' | 'Date' | 'RegExp' | 'Object' | 'JSON' | 'Math' | 'Symbol' | 'Map' | 'Set' | 'WeakMap' | 'WeakSet'), string>;

/**
 * 生成一个UID，保证同一时刻生成的值，不同即可，只能用于单机，
 * 不能用来共享，比如：当前生成的ID存到服务器上，会存在重复的风险
 */
export declare function getUId(): String;

/**
 *
 * @desc   从sessionStorage获取UserId，如无根据ISO时间戳生成
 * @return {String}
 */
export declare function getUserId(): string;

/**
 *
 * @desc   获取UUID
 * @return {String}
 */
export declare function getUUID(): string;

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
export declare function groupBy<T, K extends keyof any>(data: T[], iteratee: GroupByIteratee<T, K>): Record<K, T[]>;

export declare interface GroupByIteratee<T, K> {
    /**
     * 迭代函数。
     *
     * @param item 数据项
     * @param index 数据项的索引
     * @returns 返回在分组结果中的键
     */
    (item: T, index: number, data: T[]): K;
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
export declare function has<T>(obj: T, key: LiteralUnion<T extends any[] ? never : keyof T, string | number | symbol>): boolean;

/**
 *
 * @desc 判断元素是否有某个class
 * @param {HTMLElement} ele
 * @param {String} cls
 * @return {Boolean}
 */
export declare function hasClass(ele: HTMLElement, cls: string): boolean;

/**
 * 条件类型。
 *
 * @example
 * ```ts
 * type X = 'x'
 * // before
 * type IsX = X extends 'x' ? true : false
 * // after
 * type IsX = If<X extends 'x', true, false>
 * ```
 */
export declare type If<Condition, Then, Else> = Condition extends true ? Then : Else;

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
export declare function ii<F extends AnyFunction>(fn: F): ReturnType<F>;

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
export declare function inAndroid(callback?: () => void): boolean;

export declare namespace inAndroid {
    var clearCache: () => void;
}

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
export declare function inBrowser(callback?: () => void): boolean;

export declare namespace inBrowser {
    var clearCache: () => void;
}

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
export declare function inIOS(callback?: () => void): boolean;

export declare namespace inIOS {
    var clearCache: () => void;
}

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
export declare function inNode(callback?: () => void): boolean;

export declare namespace inNode {
    var clearCache: () => void;
}

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
export declare function inWechatMiniProgram(callback?: () => void): boolean;

export declare namespace inWechatMiniProgram {
    var clearCache: () => void;
}

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
export declare function inWechatWebview(callback?: () => void): boolean;

export declare namespace inWechatWebview {
    var clearCache: () => void;
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
export declare function isArguments(value: any): value is IArguments;

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
export declare function isArray(value: any): value is any[];

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
export declare function isBoolean(value: any): value is boolean;

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
export declare function isChineseIDCardNumber(value: string): boolean;

/**
 *
 * @desc 判断是否为16进制颜色，rgb 或 rgba
 * @param  {String}  str
 * @return {Boolean}
 */
export declare function isColor(str: string): boolean;

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
export declare function isDate(value: any): value is Date;

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
export declare function isEmail(value: string): boolean;

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
export declare function isEmpty(value: any): boolean;

/**
 *
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
export declare function isEmptyObject(obj: object): boolean;

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
export declare function isEqualArray(...arrs: any[][]): boolean;

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
declare function isFinite_2(value: any): value is number;
export { isFinite_2 as isFinite }

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
export declare function isFunction(value: any): value is Function;

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
export declare function isHan(value: string): boolean;

/**
 *
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export declare function isIdCard(str: string | number): boolean;

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
export declare function isInteger(value: any): value is number;

/**
 *
 * @desc 是否为闰年
 * @param {Number} year
 * @return {Boolean}
 */
export declare function isLeapYear(year: number): boolean;

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
declare function isNaN_2(value: any): boolean;
export { isNaN_2 as isNaN }

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
export declare function isNegativeInteger(value: any): value is number;

/**
 * 检查 `T` 是否是 `never` 类型。
 *
 * @example
 * ```ts
 * type X = never
 * // before
 * type XIsNever = [X] extends [never] ? true : false
 * // after
 * type XIsNever = IsNever<X>
 * ```
 */
export declare type IsNever<T> = [T] extends [never] ? true : false;

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
export declare function isNil(value: any): value is null | undefined;

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
export declare function isNull(value: any): value is null;

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
export declare function isNumber(value: any): value is number;

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
export declare function isNumeric(value: any): value is number | string;

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
export declare function isObject(value: any): value is object;

/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export declare function isPhoneNum(str: string | number): boolean;

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
export declare function isPlainObject(value: any): value is Record<keyof any, any>;

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
export declare function isPositiveInteger(value: any): value is number;

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
export declare function isPossibleChineseMobilePhoneNumber(number: number | string): boolean;

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
export declare function isPossibleChineseName(value: string): boolean;

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
export declare function isPromiseLike(value: any): value is PromiseLike<any>;

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
export declare function isRegExp(value: any): value is RegExp;

/**
 * @desc   判断是否为同一天
 * @param  {Date} date1
 * @param  {Date} date2 可选／默认值：当天
 * @return {Boolean}
 */
export declare function isSameDay(date1: Date, date2: Date): boolean;

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
export declare function isString(value: any): value is string;

/**
 *
 * @desc 判断浏览器是否支持webP格式图片
 * @return {Boolean}
 */
export declare function isSupportWebP(): boolean;

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
export declare function isUndefined(value: any): value is undefined;

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
export declare function isUrl(value: string): boolean;

/**
 * 字面量联合类型。
 *
 * @example
 * ```ts
 * // before: China, American 将得不到类型提示
 * type Country = 'China' | 'American' | string
 * // after: China, American 将得到类型提示
 * type Country = LiteralUnion<'China' | 'American', string>
 * ```
 */
export declare type LiteralUnion<L, B> = L | Brand<B, never>;

/**
 * @desc    异步加载script
 */
export declare function loadScript(url: string, attrs?: {
    [key: string]: string;
}): Promise<unknown>;

/**
 * 合并两个类型，后一个类型的定义将覆盖前一个类型的定义。
 *
 * @example
 * ```ts
 * type X = Merge<
 *   { x: number, y: number },
 *   { x: string, z: string }
 * >
 * // => { x: string, y: number, z: string }
 * ```
 */
export declare type Merge<M, N> = Omit_2<M, Extract<keyof M, keyof N>> & N;

/**
 * @desc 获取指定日期月份的总天数
 * @param {Date} time
 * @return {Number}
 */
export declare function monthDays(date: Date): number;

/**
 * 获取当前时间
 *
 * @return {Number} 时间戳
 */
export declare function now(): number;

/**
 *
 * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
 * @param {HTMLElement} ele
 * @returns { {left: number, top: number} }
 */
export declare function offset(ele: HTMLElement): {
    left: number;
    top: number;
};

/**
 * 从接口 `T` 中去除指定的属性。
 *
 * @example
 * ```ts
 * type X = Omit<
 *   { x: number, y: string, z: boolean },
 *   'x' | 'z'
 * >
 * // => { y: string }
 * ```
 */
declare type Omit_2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export { Omit_2 as Omit }

/**
 * @example
 * ```ts
 * // before
 * type X = number | number[]
 * // after
 * type X = OneOrMore<number>
 * ```
 */
export declare type OneOrMore<T> = T | T[];

/**
 *
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */
export declare function parseQuery(query: string): {
    [key: string]: string;
};

/**
 * 令 `T` 中的 `K` 可选。
 *
 * @example
 * ```ts
 * interface User {
 *   id: number,
 *   age: number,
 * }
 * type UserWithOptionalAge = PartialBy<User, 'age'>
 * // type UserWithOptionalAge = {
 * //   id: number,
 * //   age?: number,
 * // }
 * ```
 */
export declare type PartialBy<T, K extends keyof T> = Omit_2<T, K> & Partial<Pick<T, K>>;

/**
 * @desc    系统信息判断获取
 */
export declare const platform: {
    /**
     * 是否为mobile
     */
    mobile: boolean;
    /**
     * 是否为ios
     */
    ios: boolean;
    /**
     * 是否为android
     */
    android: boolean;
    /**
     * 是否为微信webview
     */
    weixinwebview: boolean;
    /**
     * 是否为微信小程序
     */
    miniprogram: boolean;
    /**
     * 是否为美术宝一对一app
     */
    msb1v1app: boolean;
};

/**
 *
 * @desc 随机生成颜色
 * @return {String}
 */
export declare function randomColor(): string;

/**
 *
 * @desc 生成指定范围[min, max]的随机数
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
export declare function randomNum(min: number, max: number): number;

/**
 *
 * @desc 为元素移除class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
export declare function removeClass(ele: HTMLElement, cls: string): void;

/**
 *
 * @desc 根据name删除cookie
 * @param  {String} name
 */
export declare function removeCookie(name: string): void;

/**
 * 令 `T` 中的 `K` 必填。
 *
 * @example
 * ```ts
 * interface UserWithOptionalAge {
 *   id: number,
 *   age?: number,
 * }
 * type User = RequiredBy<UserWithOptionalAge, 'age'>
 * // type User = {
 * //   id: number,
 * //   age: number,
 * // }
 * ```
 */
export declare type RequiredBy<T, K extends keyof T> = Omit_2<T, K> & Required<Pick<T, K>>;

/**
 *
 * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
 * @param {Number} to
 * @param {Number} duration
 */
declare function scrollTo_2(to: number, duration: number): void;
export { scrollTo_2 as scrollTo }

/**
 *
 * @desc  设置Cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} days
 */
export declare function setCookie(name: string, value: string, days: number): void;

/**
 *
 * @desc 设置滚动条距顶部的距离
 * @param {Number} value
 */
export declare function setScrollTop(value: number): void;

/**
 *
 * @desc   对象序列化
 * @param  {Object} obj
 * @return {String}
 */
export declare function stringfyQueryString(obj: {
    [propName: string]: any;
}): string;

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
export declare function throttle(func: () => void, wait: number, options: any): {
    (): any;
    cancel(): void;
};

/**
 * @desc ${startTime - endTime}的剩余时间,startTime大于endTime时，均返回0
 * @param { Date | String } startTime
 * @param { Date | String } endTime
 * @return { Object } { d, h, m, s } 天 时 分 秒
 */
export declare function timeLeft(startTime: Date | string, endTime: Date | string): boolean | {
    d: number;
    h: number;
    m: number;
    s: number;
};

/**
 * 返回接口 `T` 属性值的类型。
 *
 * @example
 * ```ts
 * type V = ValueOf<{ x: number, y: string, z: boolean }>
 * // => number | string | boolean
 * ```
 */
export declare type ValueOf<T> = T[keyof T];

/**
 *
 * @desc H5软键盘缩回、弹起回调
 * 当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化
 * @param {Function} downCb 当软键盘弹起后，缩回的回调
 * @param {Function} upCb 当软键盘弹起的回调
 */
export declare function windowResize(downCb: () => void, upCb: () => void): void;

export { }
