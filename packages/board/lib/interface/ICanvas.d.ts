export interface ICanvas extends fabric.Canvas {
    viewportTransform: any;
    freeDrawingBrush: any;
    clipPath: any;
    ele: Element | string;
    skipTargetFind: boolean;
    selection: boolean;
    isDrawingMode: boolean;
    selectable?: boolean;
    destory: (callback: any) => void;
}
