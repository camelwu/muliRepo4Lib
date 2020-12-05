/**
 * @desc 生成一个UID，保证同一时刻生成的值，不同即可，只能用于单机，不能用来共享，比如：当前生成的ID存到服务器上，会存在重复的风险
 * @return {String}
 */
export function getUId():String {
    const resAry = Array(4);
    const currentTime = new Date().getTime();
    const uidAry = resAry.map(() => {
        // eslint-disable-next-line no-bitwise
        return `${(Math.random() * 16) | 0}`;
    });
    uidAry.push(currentTime.toString(16));
    return uidAry.join("");
}
