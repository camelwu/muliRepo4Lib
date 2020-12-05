/**
 * 绘制的基础类，类似一个接口，因为ES 7并不支持接口，后续可以使用Typescript 来实现
 * 该类只是定义了
 *
 *
 *
 * @class Draw
 */

import { IBoard, IDrawController, ICanvas } from '../interface';

abstract class DrawContoller implements IDrawController {
    public canvas: ICanvas;

    public name: string;

    public drawIns: IBoard;

    constructor(canvas, drawIns) {
        if (!canvas) {
            throw new Error('drawContoll: 需要参数 canvas');
        }
        this.canvas = canvas;
        this.name = 'DrawContoller';
        this.drawIns = drawIns;
    }

    prepareDraw() {
        this.canvas.skipTargetFind = true; // 画板元素不能被选中
        this.canvas.selection = false;
        this.canvas.isDrawingMode = false;
    }

    prepareSelect() {
        this.canvas.selection = true;
        this.canvas.skipTargetFind = false;
        this.canvas.selectable = true;
        this.canvas.isDrawingMode = false;
    }

    startDraw() {}

    draw() {}

    endDraw() {}

    initEvent() {}

    teardownEvent() {}

    pathCreated(currentPath?: any) {
        console.log('DrawContoller pathCreated call:', currentPath);
    }
}

export default DrawContoller;
