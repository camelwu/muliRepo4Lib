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
import { now } from './now';
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
