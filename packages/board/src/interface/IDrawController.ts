export interface IDrawController {
    pathCreated: (path?: any) => void;
    startDraw: (pos?: any) => void;
    endDraw: (pos?: any) => void;
    draw: (pos?: any) => void;
    initEvent: () => void;
    teardownEvent: () => void;
}
