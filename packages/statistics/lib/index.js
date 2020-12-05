/*!
 * (c) 2014-2020 FE-Team
 * Released under the Apache License.
 */
var baidu = (id) => {
    const scriptEl = document.createElement('script');
    const targetEl = document.getElementsByTagName('script')[0];
    scriptEl.src = `//hm.baidu.com/hm.js?${id}`;
    targetEl.parentNode.insertBefore(scriptEl, targetEl);
    return (...arg) => {
        window._hmt.push(...arg);
    };
};

var toutiao = (id) => {
    return (function (r, d, s, l) {
        const meteor = (r.meteor = r.meteor || []);
        meteor.methods = ['track', 'off', 'on'];
        meteor.factory = function (method) {
            return function (...params) {
                const args = Array.prototype.slice.call(params);
                args.unshift(method);
                meteor.push(args);
                return meteor;
            };
        };
        for (let i = 0; i < meteor.methods.length; i++) {
            const key = meteor.methods[i];
            meteor[key] = meteor.factory(key);
        }
        meteor.load = function () {
            const fjs = d.getElementsByTagName(s)[0];
            const js = d.createElement(s);
            js.src = '//analytics.snssdk.com/meteor.js/v1/' + l + '/sdk';
            fjs.parentNode.insertBefore(js, fjs);
        };
        meteor.load();
        if (meteor.invoked) {
            return;
        }
        meteor.invoked = true;
        meteor.track('pageview');
        return meteor;
    })(window, document, 'script', id);
};

/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
var gdt = (id) => {
    (function (g, d, t, e, v = null, n = null, s = null) {
        if (g.gdt)
            return;
        v = g.gdt = function () {
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
    })(window, document, 'script', '//qzonestyle.gtimg.cn/qzone/biz/gdt/dmp/user-action/gdtevent.min.js');
    window.gdt('init', id);
    window.gdt('track', 'PAGE_VIEW');
    return window.gdt;
};

/* eslint-disable prefer-rest-params */
var GA = (id) => {
    function gtag(...params) {
        params.push('');
        window.dataLayer.push(arguments);
    }
    const scriptEl = document.createElement('script');
    const targetEl = document.getElementsByTagName('script')[0];
    scriptEl.src = `//www.googletagmanager.com/gtag/js?id=${id}`;
    targetEl.parentNode.insertBefore(scriptEl, targetEl);
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', id);
    return gtag;
};

var youmeng = (id) => {
    const scriptEl = document.createElement('script');
    const targetEl = document.getElementsByTagName('script')[0];
    scriptEl.src = `//s4.cnzz.com/z_stat.php?id=${id}`;
    targetEl.parentNode.insertBefore(scriptEl, targetEl);
    return (...arg) => {
        window._czc.push(...arg);
    };
};

var mta = (id, cid) => {
    const scriptEl = document.createElement('script');
    const targetEl = document.getElementsByTagName('script')[0];
    scriptEl.src = `//pingjs.qq.com/h5/stats.js?v2.0.4`;
    scriptEl.setAttribute('name', 'MTAH5');
    scriptEl.setAttribute('sid', id);
    scriptEl.setAttribute('cid', cid);
    targetEl.parentNode.insertBefore(scriptEl, targetEl);
};

const statistics = {
    "GA": GA,
    "baidu": baidu,
    "toutiao": toutiao,
    "gdt": gdt,
    "youmeng": youmeng,
    "mta": mta
};
var index = (params) => {
    return statistics[params.type](params.id, params.cid);
};

export default index;
//# sourceMappingURL=index.js.map
