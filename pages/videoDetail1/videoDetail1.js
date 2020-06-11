// pages/videoDetail1/videoDetail1.js
import polyv from '../../utils/polyv.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"",
    videoOption: {
      mode: 'vod',
      vodVid: '88083abbf5535a4d7b4d8614427559e0_8' // 播回放时vodVid为videoPoolId
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let vid = '88083abbf5535a4d7b4d8614427559e0_8';

    /*获取视频数据*/
    let obj = {
      vid: vid,
      viewerInfo: {
        viewerId: '38770077709', // 播放观看日志学员ID
        viewerName: 'polyv' // 播放观看日志学员昵称
      },
      callback: videoInfo => {
        if (videoInfo.type === 'error') {
          console.log('videoInfo', videoInfo);
          return;
        }

        debugger
        this.setData({
          src: videoInfo.src[0],
        });
      }
    };

    this.player = polyv.getVideo(obj);

  },

  timeupdate: function(e) {
    this.player.timeUpdate(e);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.player.destroy();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})