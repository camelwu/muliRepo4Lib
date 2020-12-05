import DrawContoller from './DrawController';
import {DRAW_TYPE} from '../config/drawType';

class DeleteDrawController extends DrawContoller {
    public beforeDelete: (obj?: any) => boolean;

    constructor(canvas, board) {
        super(canvas, board);
        this.name = 'DeleteDrawController';
        this.endDraw = this.endDraw.bind(this);
        this.onSelected = this.onSelected.bind(this);
        const opts = {
            beforeDelete: () => {},
            ...this.drawIns.board.options.deleteOpts,
        };
        this.beforeDelete = opts.beforeDelete || (() => {});
    }

    endDraw() {
        const currentSelects = this.canvas.getActiveObjects();
        // TODO: 存在性能问题，需要优化
        currentSelects.forEach(v => {
            if (this.beforeDelete(v) === false) {
                return;
            }
            this.canvas.remove(v);
        });
        this.canvas.discardActiveObject();//'delete:select'
        console.log('结束绘制:', currentSelects);
    }

    onSelected() {
        this.prepareSelect();
    }

    initEvent() {
        this.canvas.on('mouse:up', this.endDraw);
        this.drawIns.on(`typeChange:${DRAW_TYPE.DELETE}`, this.onSelected);
    }

    teardownEvent() {
        this.canvas.off('mouse:up', this.endDraw);
        this.drawIns.removeListener(`typeChange:${DRAW_TYPE.DELETE}`, this.onSelected);
    }
}

export default DeleteDrawController;
