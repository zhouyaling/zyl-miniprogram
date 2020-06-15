// pages/videoDetail/videoDetail.js
import polyv from '../../utils/polyv.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRateStatus:false,
    src:"", // 视频地址
    videoC:null, // 视频实例
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
      viewerInfo: {},
      callback: videoInfo => {
        if (videoInfo.type === 'error') {
          console.log('videoInfo', videoInfo);
          return;
        }

        this.setData({
          src: videoInfo.src[0],
        });

       
      }
    };

    this.player = polyv.getVideo(obj);
    this.getVideoContext();
  },

  // 实例化一个操作视频组件示例
  getVideoContext: function () {
    var _this = this
    this.setData({
      videoC:wx.createVideoContext('myVideo', this)
    })
  },

  // 显示倍数
  setRate:function (){
    this.setData({
      showRateStatus:!this.data.showRateStatus
    })
  },

  // 设置倍数
  changeRate:function (e){
    var num  = e.currentTarget.dataset.rate ? parseFloat(e.currentTarget.dataset.rate) : 1
    this.data.videoC.playbackRate(num)
    this.setData({ showRateStatus: false })
  },

  // 视频被打断
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