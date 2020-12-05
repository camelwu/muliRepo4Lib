import { EventEmitter } from 'events';
import DRAW_TYPE, { checkDrawType } from './config/drawType';

import * as util from '@msb/utils';
import FreeDrawController from './controllers/FreeDrawController';
import CircleDrawController from './controllers/CircleDrawController';
import DeleteDrawController from './controllers/DeleteDrawController';
// import DrawController from './controllers/DrawController';
import DefaultDrawController from './controllers/DefaultDrawController';
import ClipDrawController from './controllers/ClipDrawController';
import SelectDrawController from './controllers/SelectDrawController';

import {
    IBoard,
    ICanvas,
    IFreeDrawController,
    ICircleDrawController,
    IDeleteDrawController,
    IClipDrawController,
    ISelectDrawController,
    IDrawController,
} from './interface';

type Size = {
    x: number;
    y: number;
};

export interface IMouseDraw {
    drawType: DRAW_TYPE;
    preDrawType: DRAW_TYPE;
    drawInfo: Partial<Size>;
    freeDrawControll: IFreeDrawController;

    // circleDrawControll: ICircleDrawController;
    // deleteDrawController: IDeleteDrawController;
    // clipDrawController: IClipDrawController;
    // selectDrawController: ISelectDrawController;
    // defaultController: IDrawController;
    // currentDrawControll: IDrawController;
    // preDrawController: IDrawController;
    updateDrawType: (type: string) => void;
}

/**
 * 鼠标绘制，单独出来是想确保在 Board 初始化阶段可以很容易的配置进行，比如当开发者
 * 不想使用鼠标绘制的时候，可以很容易的移除，如果混合在Board内的话对这些操作就会很麻烦
 *
 * @class MouseDraw
 */
class MouseDraw extends EventEmitter {
    public drawType: DRAW_TYPE;

    public preDrawType: DRAW_TYPE;

    public drawInfo: Size;

    public drawCanvas: ICanvas;

    public isStartDraw: boolean;

    public board: IBoard;

    public currentDraw: null;

    public freeDrawControll: IFreeDrawController;

    public circleDrawControll: ICircleDrawController;

    public deleteDrawController: IDeleteDrawController;

    public clipDrawController: IClipDrawController;

    public selectDrawController: ISelectDrawController;

    public defaultController: IDrawController;

    public currentDrawControll: IDrawController;

    public preDrawController: IDrawController;

    constructor(drawCanvas, board) {
        super();
        this.drawType = DRAW_TYPE.UNKNOWEN;
        this.preDrawType = DRAW_TYPE.UNKNOWEN;
        this.drawInfo = {
            x: 0,
            y: 0,
        };
        this.drawCanvas = drawCanvas;
        this.board = board;
        this.isStartDraw = false;
        this.currentDraw = null;

        // TODO：可以做delay init
        this.freeDrawControll = new FreeDrawController(this.drawCanvas, this);
        this.circleDrawControll = new CircleDrawController(this.drawCanvas, this);
        this.deleteDrawController = new DeleteDrawController(this.drawCanvas, this);
        this.clipDrawController = new ClipDrawController(this.drawCanvas, this);
        this.selectDrawController = new SelectDrawController(this.drawCanvas, this);
        this.defaultController = new DefaultDrawController(this.drawCanvas, this);

        // 默认为空控制器，为了做一下默认操作
        this.currentDrawControll = this.defaultController;
        this.preDrawController = this.defaultController;

        this.startDraw = this.startDraw.bind(this);
        this.draw = this.draw.bind(this);
        this.endDraw = this.endDraw.bind(this);
    }

    _bindEvent() {
        // TODO：优化事件绑定
        if (this.drawType === DRAW_TYPE.CLIP) {
            this.drawCanvas.on('path:created', this.currentDrawControll.pathCreated);
            return;
        }
        this.currentDrawControll.initEvent();
    }

    _debindEvent() {
        // remove all, 会议除所有的事件绑定，造成难以追踪的bug
        // this.drawCanvas.removeListeners();
        // TODO：优化事件绑定
        if (this.preDrawType === DRAW_TYPE.CLIP) {
            this.drawCanvas.off('path:created', this.currentDrawControll.pathCreated);
            this.preDrawController.endDraw();
        }
        this.preDrawController.teardownEvent();
    }

    _execDrawAction() {
        this.preDrawController = this.currentDrawControll;
        this.currentDrawControll = this.getContollByType();

        // 可以合二为一
        // 移除老的事件绑定
        this._debindEvent();
        // 添加新的事件绑定
        this._bindEvent();

        // if (type === DRAW_TYPE.FREE) {
        //     this.freeDrawControll.startDraw();
        // } else if (type === DRAW_TYPE.SELECT) {
        //     this.currentDrawControll.prepareSelect();
        //     // this._debindEvent();
        // } else if (type === DRAW_TYPE.CLIP) {
        //     // TODO: 优化获取controller的方式
        //     // this.currentDrawControll.prepareSelect();
        //     this.currentDrawControll.startDraw();
        //     this._bindEvent();
        //     // this._debindEvent();
        // } else if (type === DRAW_TYPE.DELETE) {
        //     // this.currentDrawControll = this.getContollByType(this.drawType);
        //     this.currentDrawControll.prepareSelect();
        //     this._bindEvent();
        //     // this._debindEvent();
        // } else {
        //     // this.currentDrawControll = this.getContollByType(this.drawType);
        //     this.currentDrawControll.prepareDraw();
        //     this._bindEvent();
        // }
    }

    updateDrawType(type) {
        if (!checkDrawType(type)) {
            return;
        }
        this.preDrawType = this.drawType;
        this.drawType = type;
        this._execDrawAction();

        // must aftter bind event
        this.emit(`typeChange:${type}`, {
            preType: this.drawType,
            currType: type,
        });

        this.emit('typeChange', {
            preType: this.drawType,
            currType: type,
        });
    }

    getContollByType() {
        switch (this.drawType) {
            case DRAW_TYPE.CIRCLE:
                return this.circleDrawControll;
            case DRAW_TYPE.DELETE:
                return this.deleteDrawController;
            case DRAW_TYPE.CLIP:
                return this.clipDrawController;
            case DRAW_TYPE.FREE:
                return this.freeDrawControll;
            case DRAW_TYPE.SELECT:
                return this.selectDrawController;
            default:
                return this.defaultController;
        }
    }

    startDraw(evt) {
        const pos = util.formatPos(evt.pointer.x, evt.pointer.y);
        this.isStartDraw = true;
        this.drawInfo.x = pos.x;
        this.drawInfo.y = pos.y;
        if (!this.currentDrawControll) {
            return;
        }
        this.currentDrawControll.startDraw(pos);
    }

    draw(evt) {
        if (!this.isStartDraw) {
            return;
        }
        const pos = util.formatPos(evt.pointer.x, evt.pointer.y);
        this.drawInfo.x = pos.x;
        this.drawInfo.y = pos.y;
        if (!this.currentDrawControll) {
            return;
        }
        this.currentDrawControll.draw(pos);
    }

    endDraw(evt) {
        const pos = util.formatPos(evt.pointer.x, evt.pointer.y);
        this.isStartDraw = false;
        this.drawInfo.x = pos.x;
        this.drawInfo.y = pos.y;
        if (!this.currentDrawControll) {
            return;
        }
        this.currentDrawControll.endDraw(pos);
    }
}

export default MouseDraw;
