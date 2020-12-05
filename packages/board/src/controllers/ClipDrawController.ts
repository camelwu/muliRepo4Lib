import DrawContoller from './DrawController';
import { fabric } from "fabric";
import * as util from '@mrjl/utils';

// eslint-disable-next-line no-undef
// const { Color } = fabric;

class ClipDrawController extends DrawContoller {
    public isEnable: boolean;

    constructor(canvas, board) {
        super(canvas, board);
        this.name = 'ClipDrawController';
        this.isEnable = false;
        this.pathCreated = this.pathCreated.bind(this);
    }

    setPenWidth(width) {
        if (!util.isNumber(width)) {
            return;
        }
        this.canvas.freeDrawingBrush.width = width;
    }

    setPenColor(color) {
        const colorVal = new fabric.Color(color).getSource();//util.getColorSource(color)
        if (!colorVal) {
            console.warn('传入的颜色格式不正确: ', color);
            return;
        }
        // const colorSource = new Color(color);
        // const hexColor = colorSource.toHexa();
        this.canvas.freeDrawingBrush.color = color;
    }

    startDraw() {
        this.canvas.isDrawingMode = true;
        this.isEnable = true;
    }

    endDraw() {
        this.canvas.isDrawingMode = false;
        this.isEnable = false;
    }

    pathCreated(currentPath) {
        if (!this.isEnable) {
            return;
        }
        this.canvas.clipPath = currentPath.path;
        this.canvas.drawClipPathOnCanvas(this.canvas.getContext());
    }
}

export default ClipDrawController;
