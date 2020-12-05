/**
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */
export function parseQuery(query: string): { [key: string]: string } {
    query = !query ? window.location.href : query;
    const queryWithoutStart: string =
        query.indexOf("?") === 0 ? query.substring(1) : query;
    const uaFormated: { [key: string]: string } = {};
    const strs: string[] = queryWithoutStart.split("&");
    for (let querySingle in strs) {
        uaFormated[querySingle.split("=")[0]] = unescape(querySingle.split("=")[1]);
    }
    return uaFormated;
}
