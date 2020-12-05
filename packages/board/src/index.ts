import { fabric } from 'fabric';
import { EventEmitter } from 'events';
// import { ICanvas } from './interface';
import * as util from '@msb/utils';
import config from './config/config';
import Canvas from './canvas';
import DRAW_TYPE, { checkDrawType, getFabricClass } from './config/drawType';
import MouseDraw, { IMouseDraw } from './MouseDraw';

type Option = Partial<{
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

type Size = {
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
class Board extends EventEmitter {
    public options: Option;

    public canvas: string | Element;

    public size: Size;

    public isStartDraw: boolean;

    public drawType: DRAW_TYPE;

    public fCanvas: any;

    public mouseDraw: IMouseDraw;

    public collections: any[];

    public historyIdx: number;

    public static DRAW_TYPE = DRAW_TYPE;

    public static util = util;

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
    constructor(options: Option) {
        super();
        this.options = {
            width: 0,
            height: 0,
            backgroundColor: '',
            overlayImage: '',
            overlayColor: '',
            backgroundImage: '',
            selection: true,
            enableRetinaScaling: false,
            deleteOpts: {
                beforeDelete: () => {},
            },
            ...options,
        };
        if (!this.options.canvas) {
            throw new Error('需要传入canvas id，或者 canvas 元素');
        }
        this.canvas = this.options.canvas;
        this.size = {
            width: this.options.width,
            height: this.options.height,
        };
        this.drawType = DRAW_TYPE.UNKNOWEN;
        this.isStartDraw = false;
        this.fCanvas = this._initCanvas();
        this.mouseDraw = new MouseDraw(this.fCanvas, this);
        // 添加当前集合对象指向画布添加的对象
        this.collections = [];
        this.historyIdx = this.collections.length;
        // TODO: 后续需要改成根据场景进行绑定
        // this._bindEvent();
    }

    _initCanvas() {
        const fCanvas = new Canvas(this.canvas, {
            width: this.size.width,
            height: this.size.height,
            backgroundColor: this.options.backgroundColor,
            overlayColor: this.options.overlayColor,
            overlayImage: this.options.overlayImage,
            backgroundImage: this.options.backgroundImage,
            enableRetinaScaling: this.options.enableRetinaScaling,
        });
        // this.fCanvas = fCanvas;
        fCanvas.selection = this.options.selection as boolean;
        this._initEvent();
        this._exporseEvent();
        return fCanvas;
    }

    // TODO: 绑定事件能否做成根据不同场景进行绑定，没有场景移除事件，性能考虑
    _initEvent() {
        // this.fCanvas.off('mouse:down', this.mouseDraw.startDraw);
        // this.fCanvas.off('mouse:move', this.mouseDraw.draw);
        // this.fCanvas.off('mouse:up', this.mouseDraw.endDraw);

        // 扩展
        this.fCanvas.on('object:added', evt => {
            if (!evt.target) {
                return;
            }
            if (!evt.target.get('__msb_id')) {
                evt.target.set('__msb_id', util.getUId());
            }
        });
    }

    /**
     * 对外暴露所有事件
     *
     * @memberof Board
     */
    _exporseEvent() {
        config.boardEventList.forEach(v => {
            this.fCanvas.on(v, (...args) => {
                this.emit(v, ...args);
            });
        });
    }

    /**
     * 移除绑定的事件
     *
     * @param {string} evtName
     * @param {function} listeners
     * @memberof Board
     */
    _dexporseEvent(evtName, listeners) {
        this.removeListener(evtName, listeners);
    }

    setBackgroundColor(color) {
        this.fCanvas.setBackgroundColor(color, function(){});
        this.fCanvas.renderAll();
    }

    setOverlayColor(color) {
        this.fCanvas.setOverlayColor(color, function(){});
        this.fCanvas.renderAll();
    }

    // 用来做实时绘制
    createPencil() {
        return new fabric.PencilBrush();
    }

    // 创建path
    createPath(paths) {
        return new fabric.Path(paths);
    }

    createPoint(point) {
        const p = {
            x: 0,
            y: 0,
            ...point,
        };
        return new fabric.Point(p.x, p.y);
    }

    // 更新当前配置
    setWidth(width) {
        if (typeof width !== 'number') {
            return;
        }
        this.fCanvas.setWidth(width);
    }

    // 更新当前配置
    setHeight(height) {
        if (typeof height !== 'number') {
            return;
        }
        this.fCanvas.setHeight(height);
    }

    // 禁用 canvas 交互
    diableInteractive() {
        // 创建一个div
        // this.fCanvas.set('interactive', isInteractive);
    }

    /**
     * 取消选中
     *
     * @param {*} e 事件对象，默认课不传
     * @memberof Board
     */
    discardActiveObject(e) {
        this.fCanvas.discardActiveObject(e);
        this.fCanvas.requestRenderAll();
    }

    /**
     * 根据id 获取 object
     *
     * @param {*} id
     * @returns
     * @memberof Board
     */
    findIndexById(id) {
        let idx = -1;
        this.fCanvas.forEachObject((v, i) => {
            if (v && v.__msb_id === id) {
                idx = i;
            }
        });
        return idx;
    }

    /**
     * 根据id 获取 object
     *
     * @param {*} id
     * @returns
     * @memberof Board
     */
    findObjectById(id) {
        let res = null;
        this.fCanvas.forEachObject(v => {
            if (v && v.__msb_id === id) {
                res = v;
            }
        });
        return res;
    }

    /**
     *
     * 是否开启编组
     * @param {boolean} enable
     * @memberof Board
     */
    enableSelection(enable) {
        this.fCanvas.selection = !!enable;
    }

    /**
     * 添加绘制对象
     *
     * @param {fabric.Object} object
     * @returns
     * @memberof Board
     */
    addObject(object) {
        if (!object) {
            return;
        }
        const idx = this.findIndexById(object.__msb_id);
        // object.setCoords(false, true);
        if (idx < 0) {
            this.fCanvas.add(object);
        } else {
            // replace
            this.fCanvas.insertAt(object, idx, true);
        }
        // fix image remove bug
        this.fCanvas.renderAll();
    }

    /**
     * 获取当前矩阵
     *
     * @returns Array
     * @memberof Board
     */
    getMatrix() {
        const matrix = this.fCanvas.viewportTransform;
        return fabric.util.qrDecompose(matrix);
    }

    // TODO: __msb_id 需要提出来 不应该放在框架里面
    removeById(object) {
        const idx = this.findIndexById(object.__msb_id);
        if (idx < 0) {
            return;
        }
        this.fCanvas.remove(this.fCanvas.item(idx));
    }

    // TODO: 演示使用
    addCircle() {
        const circle = new fabric.Circle({
            radius: 20,
            fill: 'green',
            left: 100,
            top: 100,
        });
        this.fCanvas.add(circle);
        this.fCanvas.renderAll();
    }

    // TODO: 演示使用
    addRect() {
        const rect = new fabric.Rect({
            width: 100,
            height: 100,
            left: 300,
            top: 200,
            fill: 'purple',
        });

        // rect.set('angle', 45);
        rect.animate('left', '+=100', { onChange: this.fCanvas.renderAll.bind(this.fCanvas) });
        rect.animate('angle', 145, {
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce,
            onChange: this.fCanvas.renderAll.bind(this.fCanvas),
            // requestAnimationFrame(() => {
            // this.fCanvas.renderAll.bind(this.fCanvas);
            // });
            // },
        });

        this.fCanvas.add(rect);
    }

    // 添加一个SVG 对象
    addImageFromSvg(options) {
        if (!options.svgEle) {
            return null;
        }
        const callback = options.callback || (() => {});
        return fabric.Image.fromElement(options.svgEle, options.opt, callback);
    }

    /**
     * 添加图片对象
     *
     * @param {*} options
     * @returns
     * @memberof Board
     */
    addImage(options) {
        const opts = {
            filters: [
                {
                    name: 'BaseFilter',
                    params: {},
                },
            ],
            crossOrigin: 'anonymous',
            onCreate: () => {},
            opt: {},
            ...options,
        };
        if (!opts.url) {
            return null;
        }
        return fabric.Image.fromURL(
            opts.url,
            img => {
                if (opts.onCreate(img, this.fCanvas) === false) {
                    return;
                }
                opts.filters.forEach(v => {
                    // 默认配置
                    const val = {
                        noise: 300,
                        blur: 0.1,
                        brightness: 0.05,
                        contrast: 40,
                        rotation: -0.5,
                        blocksize: 8,
                        threshold: 0.2,
                        saturation: 100,
                        ...v.params,
                    };
                    if (typeof(img.filters) !== "undefined" ) {
                        img.filters.push(new fabric.Image.filters[v.name](val));
                    }
                });
                img.applyFilters();
                this.fCanvas.add(img);
            },
            {
                ...opts.opt,
                crossOrigin: opts.crossOrigin,
            },
        );
    }

    /**
     * 获取当前画板所有对象
     *
     * @param {string} type 指定的类型 可以为空
     * @returns {Array}
     * @memberof Board
     */
    getAllObjects(type) {
        return this.fCanvas.getObjects(type);
    }

    /**
     * 根据传入的type类型，生成绘制实例
     *
     * @param {Object} conf
     * @returns
     * @memberof Board
     */
    getDrawInstance(conf) {
        if (!conf || !conf.type || !conf.data) {
            return null;
        }
        const klassName = getFabricClass(conf.type);
        if (!klassName) {
            return null;
        }
        return new Promise(reslove => {
            // const newPath = null;
            const newConf = {
                ...conf,
            };
            // if (newConf.data) {
            //     const newPos = fabric.util.transformPoint(
            //         new fabric.Point(newConf.data.left, newConf.data.top),
            //         this.fCanvas.viewportTransform,
            //     );
            //     instance.top = newP.y;
            //     instance.left = newP.x;
            //     newConf.data.top = newPos.y;
            //     newConf.data.left = newPos.x;
            //     eslint-disable-next-line prefer-destructuring
            //     newConf.data.scaleX = this.fCanvas.viewportTransform[0];
            //     eslint-disable-next-line prefer-destructuring
            //     newConf.data.scaleY = this.fCanvas.viewportTransform[0];
            // }
            fabric[klassName].fromObject(newConf.data, instance => {
                reslove(instance);
            });
        });
    }

    /**
     * 从当前对象获取，fabric 实例
     *
     * @param {*} obj
     * @memberof Board
     */
    getInstancFromObject(obj) {
        return new Promise((resolve, reject) => {
            if (!obj || !obj.type) {
                reject(new Error('obj 不是有效的参数'));
            }
            const kls = obj.type[0].toUpperCase() + obj.type.substr(1);
            if (fabric[kls] && fabric[kls].fromObject) {
                fabric[kls].fromObject(obj, instance => {
                    resolve(instance);
                });
            } else {
                resolve(null);
            }
        });
    }

    loadFromJSON(json) {
        this.fCanvas.loadFromDatalessJSON(json[0], this.fCanvas.renderAll.bind(this.fCanvas));
    }

    setZoom(zoom) {
        if (typeof zoom !== 'number') {
            return;
        }
        this.fCanvas.setZoom(zoom);
    }

    resetBoard() {
        this.fCanvas.clear();
    }

    cleanBoard() {
        this.fCanvas.clearContext();
    }

    setFreeDrawMode(mode) {
        if (mode) {
            this.mouseDraw.freeDrawControll.startDraw();
        } else {
            this.mouseDraw.freeDrawControll.endDraw();
        }
    }

    setFreeDrawColor(color) {
        this.mouseDraw.freeDrawControll.setPenColor(color);
    }

    setFreeDrawWidth(width) {
        this.mouseDraw.freeDrawControll.setPenWidth(width);
    }

    getFreeDrawColor() {
        return this.mouseDraw.freeDrawControll.getPenColor();
    }

    getFreeDrawWidth() {
        return this.mouseDraw.freeDrawControll.getPenWidth();
    }

    // 设置绘画类型
    setDrawType(type) {
        if (!checkDrawType(type)) {
            return;
        }
        this.drawType = type;
        this.mouseDraw.updateDrawType(type);
    }

    destory() {
        this.collections = [];
        // this._dexporseEvent();
        this.fCanvas.dispose();
    }
}

// Board.DRAW_TYPE = DRAW_TYPE;
// Board.util = util;

export { DRAW_TYPE };

export default Board;
