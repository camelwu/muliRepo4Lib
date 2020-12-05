/**
 * @desc 获取滚动条距顶部的距离
 * @return {Number}
 */
export function getScrollTop(): number {
    return (
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop
    );
}
