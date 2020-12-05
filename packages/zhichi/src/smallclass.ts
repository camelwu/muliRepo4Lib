import { UserStatus } from './types';
// const webchatGroupidConfig: { [key: string]: any } = {
//     test: {
//         vip: 'c391e14143704d6dab466627216074db',
//         user: '8babcc48c586436ca95910514bd45f44',
//         noUser: '8babcc48c586436ca95910514bd45f44'
//     },
//     online: {
//         vip: 'b7bc46a1cc574a8f8d928aa15a76c3db',
//         user: '90028686d3074163a84e933b5c144113',
//         noUser: '90028686d3074163a84e933b5c144113'
//     }
// };

// sysnum 15f8f7e3ff534554a8478e4b4c5576cd

// groupid 86a6fdd8d34147a7b06881665821dee9
// const isonline: boolean = window.location.hostname === 'vip.meishubao.com';

export default function generateServiceGroup(
  userStatus: UserStatus,
  env?: 'online' | 'test'
): { groupid: string; sysnum: string } {
  // const env: string = isonline ? 'online' : 'test';
  // const groupid: string = webchatGroupidConfig[env][userStatus];
  const groupid = '86a6fdd8d34147a7b06881665821dee9';
  const sysnum = '15f8f7e3ff534554a8478e4b4c5576cd';
  return { groupid, sysnum };
}
