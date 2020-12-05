import DrawController from './DrawController';
declare class ImageDrawController extends DrawController {
    constructor(canvas: any, board: any);
    startDraw(): void;
    draw(): void;
    endDraw(): void;
}
export default ImageDrawController;
