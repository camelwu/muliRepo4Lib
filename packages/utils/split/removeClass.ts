/**
 *
 * @desc 为元素移除class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
import { hasClass } from './hasClass';
export function removeClass(ele: HTMLElement, cls: string): void {
    if (hasClass(ele, cls)) {
        const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);
        ele.className = ele.className.replace(reg, " ");
    }
}
