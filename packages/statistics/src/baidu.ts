export default (id: string) => {
  const scriptEl: any = document.createElement('script');
  const targetEl: any = document.getElementsByTagName('script')[0];
  scriptEl.src = `//hm.baidu.com/hm.js?${id}`;
  targetEl.parentNode.insertBefore(scriptEl, targetEl);
  return (...arg: any) => {
    window._hmt.push(...arg);
  };
};
