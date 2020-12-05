/**
 * 绘制的基础类，类似一个接口，因为ES 7并不支持接口，后续可以使用Typescript 来实现
 * 该类只是定义了
 *
 *
 *
 * @class Draw
 */
import { IBoard, IDrawController, ICanvas } from '../interface';
declare abstract class DrawContoller implements IDrawController {
    canvas: ICanvas;
    name: string;
    drawIns: IBoard;
    constructor(canvas: any, drawIns: any);
    prepareDraw(): void;
    prepareSelect(): void;
    startDraw(): void;
    draw(): void;
    endDraw(): void;
    initEvent(): void;
    teardownEvent(): void;
    pathCreated(currentPath?: any): void;
}
export default DrawContoller;
