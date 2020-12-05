import { IFreeDrawController } from '../interface';
import DrawContoller from './DrawController';
declare class FreeDrawController extends DrawContoller implements IFreeDrawController {
    constructor(canvas: any, drawIns: any);
    setPenWidth(width: any): void;
    setPenColor(color: any): void;
    getPenWidth(): any;
    getPenColor(): any;
    startDraw(): void;
    endDraw(): void;
    initEvent(): void;
    teardownEvent(): void;
}
export default FreeDrawController;
