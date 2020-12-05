import DrawContoller from './DrawController';
declare class DeleteDrawController extends DrawContoller {
    beforeDelete: (obj?: any) => boolean;
    constructor(canvas: any, board: any);
    endDraw(): void;
    onSelected(): void;
    initEvent(): void;
    teardownEvent(): void;
}
export default DeleteDrawController;
