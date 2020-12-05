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
