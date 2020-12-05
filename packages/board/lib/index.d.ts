/// <reference types="node" />
import { fabric } from 'fabric';
import { EventEmitter } from 'events';
import * as util from '@msb/utils';
import Canvas from './canvas';
import DRAW_TYPE from './config/drawType';
import { IMouseDraw } from './MouseDraw';
declare type Option = Partial<{
    width: number;
    height: number;
    backgroundColor: string;
    overlayImage: string;
    overlayColor: string;
    backgroundImage: string;
    selection: boolean;
    enableRetinaScaling: boolean;
    canvas: string | Element;
    deleteOpts: {
        beforeDelete: () => void;
    };
}>;
declare type Size = {
    width: number | undefined;
    height: number | undefined;
};
/**
 * @description Board 是整个程序入口，用来初始化程序，给外部提供修改配置的接口，对外部暴露项目状态。
 * 项目中只用来，初始化项目，参数校验，对外部提供接口，对外部暴露状态
 *
 * 第一版实现，只提供接口，不对外提供控制组件等相关的UI
 *
 */
declare class Board extends EventEmitter {
    options: Option;
    canvas: string | Element;
    size: Size;
    isStartDraw: boolean;
    drawType: DRAW_TYPE;
    fCanvas: any;
    mouseDraw: IMouseDraw;
    collections: any[];
    historyIdx: number;
    static DRAW_TYPE: typeof DRAW_TYPE;
    static util: typeof util;
    /**
     * Creates an instance of Board.
     * @param {*} 初始化参与定义 {
     *  canvas: string(css-selector | id) | htmlElement 用来渲染
     *  width: number 宽 可以用来覆盖默认宽
     *  height: number 高 可以用来覆盖默认高
     *  backgroundColor: string 背景颜色
     *  overlayImage: string 遮罩图片
     *  backgroundImage: sting 背景图片
     *  overlayColor: string 遮罩层颜色
     *
     * }
     * @memberof Board
     */
    constructor(options: Option);
    _initCanvas(): Canvas;
    _initEvent(): void;
    /**
     * 对外暴露所有事件
     *
     * @memberof Board
     */
    _exporseEvent(): void;
    /**
     * 移除绑定的事件
     *
     * @param {string} evtName
     * @param {function} listeners
     * @memberof Board
     */
    _dexporseEvent(evtName: any, listeners: any): void;
    setBackgroundColor(color: any): void;
    setOverlayColor(color: any): void;
    createPencil(): fabric.PencilBrush;
    createPath(paths: any): fabric.Path;
    createPoint(point: any): fabric.Point;
    setWidth(width: any): void;
    setHeight(height: any): void;
    diableInteractive(): void;
    /**
     * 取消选中
     *
     * @param {*} e 事件对象，默认课不传
     * @memberof Board
     */
    discardActiveObject(e: any): void;
    /**
     * 根据id 获取 object
     *
     * @param {*} id
     * @returns
     * @memberof Board
     */
    findIndexById(id: any): number;
    /**
     * 根据id 获取 object
     *
     * @param {*} id
     * @returns
     * @memberof Board
     */
    findObjectById(id: any): null;
    /**
     *
     * 是否开启编组
     * @param {boolean} enable
     * @memberof Board
     */
    enableSelection(enable: any): void;
    /**
     * 添加绘制对象
     *
     * @param {fabric.Object} object
     * @returns
     * @memberof Board
     */
    addObject(object: any): void;
    /**
     * 获取当前矩阵
     *
     * @returns Array
     * @memberof Board
     */
    getMatrix(): {
        angle: number;
        scaleX: number;
        scaleY: number;
        skewX: number;
        skewY: number;
        translateX: number;
        translateY: number;
    };
    removeById(object: any): void;
    addCircle(): void;
    addRect(): void;
    addImageFromSvg(options: any): fabric.Image | null;
    /**
     * 添加图片对象
     *
     * @param {*} options
     * @returns
     * @memberof Board
     */
    addImage(options: any): fabric.Image | null;
    /**
     * 获取当前画板所有对象
     *
     * @param {string} type 指定的类型 可以为空
     * @returns {Array}
     * @memberof Board
     */
    getAllObjects(type: any): any;
    /**
     * 根据传入的type类型，生成绘制实例
     *
     * @param {Object} conf
     * @returns
     * @memberof Board
     */
    getDrawInstance(conf: any): Promise<unknown> | null;
    /**
     * 从当前对象获取，fabric 实例
     *
     * @param {*} obj
     * @memberof Board
     */
    getInstancFromObject(obj: any): Promise<unknown>;
    loadFromJSON(json: any): void;
    setZoom(zoom: any): void;
    resetBoard(): void;
    cleanBoard(): void;
    setFreeDrawMode(mode: any): void;
    setFreeDrawColor(color: any): void;
    setFreeDrawWidth(width: any): void;
    getFreeDrawColor(): string;
    getFreeDrawWidth(): number;
    setDrawType(type: any): void;
    destory(): void;
}
export { DRAW_TYPE };
export default Board;
