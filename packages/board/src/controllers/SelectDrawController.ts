import DrawContoller from './DrawController';
import {DRAW_TYPE} from '../config/drawType';

class SelectDrawController extends DrawContoller {
    constructor(canvas, drawIns) {
        super(canvas, drawIns);
        this.name = 'SelectDrawController';
        this.onSelected = this.onSelected.bind(this);
    }

    onSelected() {
        this.prepareSelect();
    }

    initEvent() {
        this.drawIns.on(`typeChange:${DRAW_TYPE.SELECT}`, this.onSelected);
    }

    teardownEvent() {
        this.drawIns.removeListener(`typeChange:${DRAW_TYPE.SELECT}`, this.onSelected);
    }
}

export default SelectDrawController;
