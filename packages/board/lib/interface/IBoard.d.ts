export interface IBoard {
    board: any;
    on: (eventName: string, callback: any) => void;
    off: (eventName: string, callback: any) => void;
    addListener: (eventName: string, callback: any) => void;
    removeListener: (eventName: string, callback: any) => void;
}
