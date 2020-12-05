import { IDrawController } from './IDrawController';

export interface IFreeDrawController extends IDrawController {
    setPenColor: (color: string) => void;
    setPenWidth: (width: number) => void;
    getPenColor: () => string;
    getPenWidth: () => number;
}
