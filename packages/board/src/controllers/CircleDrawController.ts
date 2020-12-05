import { fabric } from 'fabric';
import DrawContoll from './DrawController';
import * as util from '@msb/utils';
import { DRAW_TYPE } from '../config/drawType';

class CircleDrawController extends DrawContoll {
    public startPos: {
        x: number;
        y: number;
    };

    public endPos: {
        x: number;
        y: number;
    };

    public currentDrawn: any;

    public stroke: string;

    public fill: string;

    public strokeWidth: number;

    public collections: any[];

    public isStartDraw: boolean;

    constructor(canvas, board) {
        super(canvas, board);
        this.name = 'CircleDrawController';
        this.startPos = {
            x: 0,
            y: 0,
        };
        this.endPos = {
            x: 0,
            y: 0,
        };
        this.currentDrawn = null;
        this.stroke = '';
        this.fill = '';
        this.strokeWidth = 1;
        this.collections = [];
        this.isStartDraw = false;

        this.onSelected = this.onSelected.bind(this);
        this.onStartDraw = this.onStartDraw.bind(this);
        this.onDraw = this.onDraw.bind(this);
        this.onEndDraw = this.onEndDraw.bind(this);
    }

    startDraw(pos?: any) {
        if (!pos) {
            return;
        }
        this.startPos = {
            x: pos.x,
            y: pos.y,
        };
    }

    drawCircle() {
        if (this.currentDrawn) {
            this.canvas.remove(this.currentDrawn);
            this.currentDrawn = null;
        }
        const left = this.startPos.x;
        const top = this.startPos.y;
        const radius =
            Math.sqrt(Math.pow(this.endPos.x - left, 2) + Math.pow(this.endPos.y - top, 2)) / 2;
        // eslint-disable-next-line no-undef
        this.currentDrawn = new fabric.Circle({
            left,
            top,
            stroke: 'red',
            fill: this.fill,
            radius,
            strokeWidth: this.strokeWidth,
        });

        this.currentDrawn.set('originX', this.endPos.x - left < 0 ? 'right' : 'left');
        this.currentDrawn.set('originY', this.endPos.y - top < 0 ? 'bottom' : 'top');

        this.canvas.add(this.currentDrawn);
        this.canvas.renderAll();
    }

    draw(pos?: any) {
        this.endPos.x = pos.x;
        this.endPos.y = pos.y;
        this.drawCircle();
    }

    endDraw(pos?: any) {
        this.draw(pos);
        this.collections.push(this.currentDrawn);
        this.currentDrawn = null;
    }

    onSelected() {
        this.prepareDraw();
    }

    onStartDraw(evt) {
        const pos = util.formatPos(evt.pointer.x, evt.pointer.y);
        this.isStartDraw = true;
        this.startDraw(pos);
    }

    onDraw(evt) {
        if (!this.isStartDraw) {
            return;
        }
        const pos = util.formatPos(evt.pointer.x, evt.pointer.y);
        this.draw(pos);
    }

    onEndDraw(evt) {
        const pos = util.formatPos(evt.pointer.x, evt.pointer.y);
        this.isStartDraw = false;
        // this.drawInfo.x = pos.x;
        // this.drawInfo.y = pos.y;
        // if (!this.currentDrawControll) {
        //     return;
        // }
        this.endDraw(pos);
    }

    initEvent() {
        this.canvas.on('mouse:down', this.onStartDraw);
        this.canvas.on('mouse:move', this.onDraw);
        this.canvas.on('mouse:up', this.onEndDraw);

        this.drawIns.on(`typeChange:${DRAW_TYPE.CIRCLE}`, this.onSelected);
    }

    teardownEvent() {
        this.canvas.off('mouse:down', this.onStartDraw);
        this.canvas.off('mouse:move', this.onDraw);
        this.canvas.off('mouse:up', this.onEndDraw);

        this.drawIns.removeListener(`typeChange:${DRAW_TYPE.CIRCLE}`, this.onSelected);
    }

    setStokeColor() { }

    setFillColor() { }

    setStrokeWidth() { }

    getAllCircles() { }

    remove() { }
}

export default CircleDrawController;
