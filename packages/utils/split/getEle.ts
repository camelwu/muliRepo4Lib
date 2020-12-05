/**
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
