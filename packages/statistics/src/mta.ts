export default (id: string, cid?: string) => {
  const scriptEl: any = document.createElement('script');
  const targetEl: any = document.getElementsByTagName('script')[0];
  scriptEl.src = `//pingjs.qq.com/h5/stats.js?v2.0.4`;
  scriptEl.setAttribute('name', 'MTAH5');
  scriptEl.setAttribute('sid', id);
  scriptEl.setAttribute('cid', cid);

  targetEl.parentNode.insertBefore(scriptEl, targetEl);
};
