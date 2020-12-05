/**
 *
 * @desc 根据name删除cookie
 * @param  {String} name
 */
import { setCookie } from './setCookie';
export function removeCookie(name: string): void {
    // 设置已过期，系统会立刻删除cookie
    setCookie(name, "1", -1);
}
