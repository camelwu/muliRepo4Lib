import DrawContoll from './DrawController';
declare class CircleDrawController extends DrawContoll {
    startPos: {
        x: number;
        y: number;
    };
    endPos: {
        x: number;
        y: number;
    };
    currentDrawn: any;
    stroke: string;
    fill: string;
    strokeWidth: number;
    collections: any[];
    isStartDraw: boolean;
    constructor(canvas: any, board: any);
    startDraw(pos?: any): void;
    drawCircle(): void;
    draw(pos?: any): void;
    endDraw(pos?: any): void;
    onSelected(): void;
    onStartDraw(evt: any): void;
    onDraw(evt: any): void;
    onEndDraw(evt: any): void;
    initEvent(): void;
    teardownEvent(): void;
    setStokeColor(): void;
    setFillColor(): void;
    setStrokeWidth(): void;
    getAllCircles(): void;
    remove(): void;
}
export default CircleDrawController;
