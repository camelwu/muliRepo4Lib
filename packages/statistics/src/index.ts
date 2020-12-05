import baidu from './baidu';
import toutiao from './toutiao';
import gdt from './gdt';
import GA from './GA';
import youmeng from './youmeng';
import mta from './mta';

interface ExampleParams {
  type: 'baidu' | 'GA' | 'gdt' | 'toutiao' | 'youmeng' | 'mta';
  id: string;
  cid?: string;
}

declare global {
  interface Window {
    _czc: any;
    _hmt: any;
    meteor: any;
    dataLayer: any;
    gdt: any;
    MtaH5: any;
  }
}

const statistics = {
  "GA": GA,
  "baidu": baidu,
  "toutiao": toutiao,
  "gdt": gdt,
  "youmeng": youmeng,
  "mta": mta
};

export default (params: ExampleParams) => {
  return statistics[params.type](params.id, params.cid);
};
