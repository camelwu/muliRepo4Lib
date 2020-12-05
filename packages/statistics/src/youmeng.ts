export default (id: string) => {
  const scriptEl: any = document.createElement('script');
  const targetEl: any = document.getElementsByTagName('script')[0];
  scriptEl.src = `//s4.cnzz.com/z_stat.php?id=${id}`;
  targetEl.parentNode.insertBefore(scriptEl, targetEl);
  return (...arg: any) => {
    window._czc.push(...arg);
  };
};
