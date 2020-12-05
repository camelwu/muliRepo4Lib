import { UserStatus } from './types';
declare global {
    interface Window {
        zc: (action: string, options: {
            [key: string]: any;
        }) => void;
        cbk: any[];
    }
}
declare type Product = '1v1' | 'smallclass';
interface ZhichiConfig {
    product: Product;
    partnerid: string;
    userStatus: UserStatus;
    type?: number;
    groupid?: string;
    agentid?: string;
    className?: string;
    locale?: string;
    anchor?: boolean;
    env?: 'online' | 'test';
    zhichiCustomeSetting?: object;
}
declare function initZhichi(config: ZhichiConfig): void;
export default initZhichi;
