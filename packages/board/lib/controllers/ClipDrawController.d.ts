import DrawContoller from './DrawController';
declare class ClipDrawController extends DrawContoller {
    isEnable: boolean;
    constructor(canvas: any, board: any);
    setPenWidth(width: any): void;
    setPenColor(color: any): void;
    startDraw(): void;
    endDraw(): void;
    pathCreated(currentPath: any): void;
}
export default ClipDrawController;
