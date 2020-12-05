import { fabric } from "fabric";
declare type Option = {};
/**
 * 增强canvas的能力
 * 支持 选择器
 * 删除对 ID的支持
 * 增强背景类型
 * 支持销毁实例
 * TODO: 需要验证自定义类对cache的影响
 * TODO: 需要根据实际情况，完善方法
 *
 */
declare class Canvas extends fabric.Canvas {
    options: any;
    cvsId: String;
    viewportTransform: any;
    freeDrawingBrush: any;
    clipPath: any;
    ele: Element | string;
    constructor(ele: any, options: Option);
    destory(): void;
}
export default Canvas;
