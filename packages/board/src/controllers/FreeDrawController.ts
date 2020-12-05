import { IFreeDrawController } from '../interface';
import DrawContoller from './DrawController';

import * as util from '@msb/utils';
import {DRAW_TYPE} from '../config/drawType';
import {fabric} from 'fabric';

class FreeDrawController extends DrawContoller implements IFreeDrawController {
    constructor(canvas, drawIns) {
        super(canvas, drawIns);
        this.name = 'FreeDrawController';
        this.startDraw = this.startDraw.bind(this);
        this.endDraw = this.endDraw.bind(this);
    }

    setPenWidth(width) {
        if (!util.isNumber(width)) {
            return;
        }
        this.canvas.freeDrawingBrush.width = width;
    }

    setPenColor(color) {
        const colorVal = new fabric.Color(color).getSource();//util.getColorSource(color);
        if (!colorVal) {
            console.warn('传入的颜色格式不正确: ', color);
            return;
        }
        this.canvas.freeDrawingBrush.color = color;
    }

    getPenWidth() {
        return this.canvas.freeDrawingBrush.width;
    }

    getPenColor() {
        return this.canvas.freeDrawingBrush.color;
    }

    startDraw() {
        this.canvas.isDrawingMode = true;
    }

    endDraw() {
        this.canvas.isDrawingMode = false;
    }

    initEvent() {
        this.drawIns.on(`typeChange:${DRAW_TYPE.FREE}`, this.startDraw);
    }

    teardownEvent() {
        this.drawIns.removeListener(`typeChange:${DRAW_TYPE.FREE}`, this.startDraw);
    }
}

export default FreeDrawController;
