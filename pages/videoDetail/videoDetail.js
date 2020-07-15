// pages/videoDetail/videoDetail.js
import polyv from '../../utils/polyv.js';
import Server from './videoDetailServer'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'mp4', // 视频资源类型
    vid:"", // 88083abbf5535a4d7b4d8614427559e0_8
    showRateStatus:false,
    src:"", // 视频地址 https://www.w3school.com.cn/i/movie.mp4
    videoC:null, // 视频实例
    itemInfo:{}, // 
    banDes:"",
    initialTime:0, // 播放进度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.itemInfo){
      let info = JSON.parse(options.itemInfo);
      var currTime = wx.getStorageSync(info.Id)
      if(currTime){
        this.setData({initialTime:currTime})
      }

      this.setData({
        vid:info.VideoUrl,
        type:(info.VideoUrl.indexOf('http')>-1) ? 'mp4' : 'polyv',
        itemInfo:info,
        banDes:options.des
      })
      if(this.data.type=='mp4'){
        this.setData({src:info.VideoUrl})
      }
    }

     this.saveViewTimes();
  },

  
  // 增加阅读次数
  async saveViewTimes(){
    let _this = this;
    let res = await Server.saveViewTimes({id:this.data.itemInfo.Id});
      if(res.Result){
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.type=='polyv'){
      let obj = {
        vid: this.data.vid,
        viewerInfo: {},
        callback: videoInfo => {
          if (videoInfo.type === 'error') {
            return;
          }
          this.setData({
            src: videoInfo.src[0],
          });
        }
      };
      this.player = polyv.getVideo(obj);
    }
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

  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },

  // 播放进度变化
  timeupdate: function(e) {
    if(this.data.type=='polyv'){
      this.player.timeUpdate(e);
    }else{
      wx.setStorageSync(this.data.itemInfo.Id, e.detail.currentTime)
    }
  },

  // 元数据加载完成
  loadedmetadata:function (e){
    this.data.videoC.play()
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
    if(this.data.type=='polyv'){
      this.player.destroy();
    }
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