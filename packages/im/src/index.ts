import IM_TYPE from './config/IM_TYPE';
import RongYunIM from './rongyun';
import RTM from './rtm';

// TODO: 后续优化
const createIM = (type: IM_TYPE, ...args: object[]) => {
    const option = args[0];
    if (type === IM_TYPE.RONGYUN) {
        return new RongYunIM(option);
    }
    if (type === IM_TYPE.RTM) {
        return new RTM(option);
    }
    throw new Error('im 类型错误');
};

export { createIM, IM_TYPE, RongYunIM, RTM };

export default {
    IMTYPE: IM_TYPE,
    RongYunIM,
    RTM,
};
