declare enum DRAW_TYPE {
    UNKNOWEN = 0,
    CIRCLE = 1,
    RECT = 2,
    FREE = 3,
    PATH = 4,
    IMAGE = 5,
    TEXT = 6,
    ITEXT = 7,
    ELLIPSE = 8,
    LINE = 9,
    POINT = 10,
    POINT_LINE = 11,
    POLYHON = 12,
    POLY_LINE = 13,
    TEXT_BOX = 14,
    TRIANGLE = 15,
    SELECT = 16,
    DELETE = 17,
    CLIP = 18
}
declare const getFabricClass: (val: string | number) => string;
/**
 * 根据当前值获取绘制类型
 *
 * @param {number} val
 * @returns
 */
declare const getDrawTypeByVal: (val: string) => string[];
/**
 * 检测当前绘制类型是否合法
 *
 * @param {number} drawType
 * @returns {boolean}
 */
declare const checkDrawType: (drawType: string) => boolean;
export { DRAW_TYPE, getDrawTypeByVal, checkDrawType, getFabricClass };
export default DRAW_TYPE;
