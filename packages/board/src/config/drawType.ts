enum DRAW_TYPE {
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
    CLIP = 18,
}

const klassMap: { [key: string]: string } = {
    '1': 'Circle',
    '2': 'Rect',
    '3': 'Path',
    '4': 'Path',
    '5': 'Image',
};

const getFabricClass = (val: string | number) => {
    let inputVal = '';
    if (typeof val !== 'string') {
        inputVal = `${val}`;
    } else {
        inputVal = val;
    }
    return klassMap[inputVal];
};

/**
 * 根据当前值获取绘制类型
 *
 * @param {number} val
 * @returns
 */
const getDrawTypeByVal = (val: string) => {
    if (!val) {
        return [];
    }
    const result: string[] = [];
    Object.keys(DRAW_TYPE).forEach(member => {
        if (DRAW_TYPE[member] === val) {
            result.push(member);
        }
    });
    // for (const member in DRAW_TYPE) {
    //     if (DRAW_TYPE[member] === val) {
    //         result.push(member);
    //     }
    // }
    return result;
};

/**
 * 检测当前绘制类型是否合法
 *
 * @param {number} drawType
 * @returns {boolean}
 */
const checkDrawType = (drawType: string) => {
    if (getDrawTypeByVal(drawType).length < 1) {
        return false;
    }
    return true;
};

export { DRAW_TYPE, getDrawTypeByVal, checkDrawType, getFabricClass };

export default DRAW_TYPE;
