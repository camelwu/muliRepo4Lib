/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
export default (id: string) => {
  (function(g, d, t, e, v: any = null, n: any = null, s: any = null) {
    if (g.gdt) return;
    v = g.gdt = function() {
      v.tk ? v.tk.apply(v, arguments) : v.queue.push(arguments);
    };
    v.sv = '1.0';
    v.bt = 0;
    v.queue = [];
    n = d.createElement(t);
    n.async = !0;
    n.src = e;
    s = d.getElementsByTagName(t)[0];
    s.parentNode.insertBefore(n, s);
  })(
    window,
    document,
    'script',
    '//qzonestyle.gtimg.cn/qzone/biz/gdt/dmp/user-action/gdtevent.min.js'
  );
  window.gdt('init', id);
  window.gdt('track', 'PAGE_VIEW');
  return window.gdt;
};
