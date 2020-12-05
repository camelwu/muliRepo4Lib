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
