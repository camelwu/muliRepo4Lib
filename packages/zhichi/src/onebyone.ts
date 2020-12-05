import { UserStatus } from './types';
import { platform } from '@msb/utils';
const webchatGroupidConfig: { [key: string]: any } = {
  test: {
    vip: 'c391e14143704d6dab466627216074db',
    user: '8babcc48c586436ca95910514bd45f44',
    noUser: '8babcc48c586436ca95910514bd45f44'
  },
  online: {
    vip: 'b7bc46a1cc574a8f8d928aa15a76c3db',
    user: '90028686d3074163a84e933b5c144113',
    noUser: '90028686d3074163a84e933b5c144113'
  }
};
const isonline: boolean =
  !platform.miniprogram && window.location.hostname === 'vip.meishubao.com';

export default function generateServiceGroup(
  userStatus: UserStatus,
  env?: 'online' | 'test'
): { groupid: string; sysnum: string; robotid: number } {
  const currentEnv: string = env ? env : isonline ? 'online' : 'test';
  const groupid: string = webchatGroupidConfig[currentEnv][userStatus];
  const sysnum = 'fce2741b560141a189049555c54922e8';
  const robotid: number = userStatus === 'vip' ? 2 : 1;
  return { groupid, sysnum, robotid };
}
