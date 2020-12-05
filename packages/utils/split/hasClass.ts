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
