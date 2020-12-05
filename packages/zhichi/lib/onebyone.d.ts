import { UserStatus } from './types';
export default function generateServiceGroup(userStatus: UserStatus, env?: 'online' | 'test'): {
    groupid: string;
    sysnum: string;
    robotid: number;
};
