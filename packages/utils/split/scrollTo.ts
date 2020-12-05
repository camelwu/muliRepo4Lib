/**
 *
 * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
 * @param {Number} to
 * @param {Number} duration
 */
import { setScrollTop } from './setScrollTop';
import { getScrollTop } from './getScrollTop';
var requestAnimFrame = (function () {
    // window.mozRequestAnimationFrame ||#ff低版本
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

export function scrollTo(to: number, duration: number): void {
    if (duration < 0) {
        setScrollTop(to);
        return;
    }
    const diff = to - getScrollTop();
    if (diff === 0) return;
    const step = (diff / duration) * 10;
    requestAnimFrame(function () {
        if (Math.abs(step) > Math.abs(diff)) {
            setScrollTop(getScrollTop() + diff);
            return;
        }
        setScrollTop(getScrollTop() + step);
        if (
            (diff > 0 && getScrollTop() >= to) ||
            (diff < 0 && getScrollTop() <= to)
        ) {
            return;
        }
        scrollTo(to, duration - 16);
    });
}

