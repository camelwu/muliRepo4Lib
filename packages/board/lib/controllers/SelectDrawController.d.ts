import DrawContoller from './DrawController';
declare class SelectDrawController extends DrawContoller {
    constructor(canvas: any, drawIns: any);
    onSelected(): void;
    initEvent(): void;
    teardownEvent(): void;
}
export default SelectDrawController;
