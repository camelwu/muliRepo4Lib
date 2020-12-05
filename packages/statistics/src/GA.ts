/* eslint-disable prefer-rest-params */

export default (id: any) => {
  function gtag(...params: any) {
    params.push('');
    window.dataLayer.push(arguments);
  }

  const scriptEl: any = document.createElement('script');
  const targetEl: any = document.getElementsByTagName('script')[0];
  scriptEl.src = `//www.googletagmanager.com/gtag/js?id=${id}`;
  targetEl.parentNode.insertBefore(scriptEl, targetEl);

  window.dataLayer = window.dataLayer || [];
  gtag('js', new Date());
  gtag('config', id);

  return gtag;
};
