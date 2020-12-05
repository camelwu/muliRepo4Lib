export default (id: string) => {
  return (function(r: any, d, s, l) {
    const meteor = (r.meteor = r.meteor || []);
    meteor.methods = ['track', 'off', 'on'];
    meteor.factory = function(method: any) {
      return function(...params: any) {
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

    meteor.load = function() {
      const fjs: any = d.getElementsByTagName(s)[0];
      const js: any = d.createElement(s);
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
