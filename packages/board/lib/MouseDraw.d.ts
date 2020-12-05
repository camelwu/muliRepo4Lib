/// <reference types="node" />
import { EventEmitter } from 'events';
import DRAW_TYPE from './config/drawType';
import { IBoard, ICanvas, IFreeDrawController, ICircleDrawController, IDeleteDrawController, IClipDrawController, ISelectDrawController, IDrawController } from './interface';
declare type Size = {
    x: number;
    y: number;
};
export interface IMouseDraw {
    drawType: DRAW_TYPE;
    preDrawType: DRAW_TYPE;
    drawInfo: Partial<Size>;
    freeDrawControll: IFreeDrawController;
    updateDrawType: (type: string) => void;
}
/**
 * 鼠标绘制，单独出来是想确保在 Board 初始化阶段可以很容易的配置进行，比如当开发者
 * 不想使用鼠标绘制的时候，可以很容易的移除，如果混合在Board内的话对这些操作就会很麻烦
 *
 * @class MouseDraw
 */
declare class MouseDraw extends EventEmitter {
    drawType: DRAW_TYPE;
    preDrawType: DRAW_TYPE;
    drawInfo: Size;
    drawCanvas: ICanvas;
    isStartDraw: boolean;
    board: IBoard;
    currentDraw: null;
    freeDrawControll: IFreeDrawController;
    circleDrawControll: ICircleDrawController;
    deleteDrawController: IDeleteDrawController;
    clipDrawController: IClipDrawController;
    selectDrawController: ISelectDrawController;
    defaultController: IDrawController;
    currentDrawControll: IDrawController;
    preDrawController: IDrawController;
    constructor(drawCanvas: any, board: any);
    _bindEvent(): void;
    _debindEvent(): void;
    _execDrawAction(): void;
    updateDrawType(type: any): void;
    getContollByType(): IDrawController;
    startDraw(evt: any): void;
    draw(evt: any): void;
    endDraw(evt: any): void;
}
export default MouseDraw;
