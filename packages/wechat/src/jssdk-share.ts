export interface IjssdkShareParams {
  title: string;
  desc: string;
  link: string;
  imgUrl: string;
}
export default ({
  title,
  desc,
  link = location.href,
  imgUrl
}: IjssdkShareParams) => {
  // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
  wx.ready(function() {
    //需在用户可能点击分享按钮前就先调用
    wx.updateAppMessageShareData({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function() {
        // 设置成功
      }
    });
  });

  //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
  wx.ready(function() {
    //需在用户可能点击分享按钮前就先调用
    wx.updateTimelineShareData({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function() {
        // 设置成功
      }
    });
  });
};
