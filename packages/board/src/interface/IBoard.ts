type callback = (evt: any) => void;
export interface IBoard {
    board: any;
    on: (eventName: string, callback) => void;
    off: (eventName: string, callback) => void;
    addListener: (eventName: string, callback) => void;
    removeListener: (eventName: string, callback) => void;
}
