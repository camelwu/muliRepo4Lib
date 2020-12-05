import IM_TYPE from './config/IM_TYPE';
import RongYunIM from './rongyun';
import RTM from './rtm';
declare const createIM: (type: IM_TYPE, ...args: object[]) => RongYunIM | RTM;
export { createIM, IM_TYPE, RongYunIM, RTM };
declare const _default: {
    IMTYPE: typeof IM_TYPE;
    RongYunIM: typeof RongYunIM;
    RTM: typeof RTM;
};
export default _default;
