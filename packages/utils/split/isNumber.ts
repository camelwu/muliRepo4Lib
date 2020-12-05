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
