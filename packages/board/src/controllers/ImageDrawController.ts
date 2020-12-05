import DrawController from './DrawController';

class ImageDrawController extends DrawController {
    constructor(canvas, board) {
        super(canvas, board);
        this.name = 'ImageController';
    }

    startDraw() {}

    draw() {}

    endDraw() {}
}

export default ImageDrawController;
