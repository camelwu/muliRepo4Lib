/**
 * @desc 格式化鼠标位置，根据缩放比例进行等比
 *
 * @param {Number} ele
 * @return {Object} {x: Num, y: Num}
 */
export function formatPos(mouseX: number, mouseY: number) {
    const zoom = (window as any).zoom || 1;
    return { x: mouseX / zoom, y: mouseY / zoom };
}
