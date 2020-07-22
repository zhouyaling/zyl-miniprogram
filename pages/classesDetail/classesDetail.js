
import polyv from '../../utils/polyv.js';
import Server from './classesDetailServer'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'', //  资源类型
    showRateStatus:false, // 显示倍数选项
    src:"", //  地址
    player:null, //  实例
    polyvPlayer:null, // polyv实例
    itemInfo:{}, // 课程信息
    banDes:"", // 班级信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if(options.itemInfo){
      let info = JSON.parse(options.itemInfo);
      this.setData({
        type:(info.VideoUrl.indexOf('http')>-1) ? 'mp4' : 'polyv',
        itemInfo:info,
        banDes:options.des
      })
      this.saveViewTimes();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.type=='polyv'){
      let obj = {
        vid:  this.data.itemInfo.VideoUrl, //'88083abbf5535a4d7b4d8614427559e0_8', //, // 
        viewerInfo: {},
        callback: videoInfo => {
          if (videoInfo.type === 'error') {
            return;
          }
          this.setData({ src: videoInfo.src[0] });
        }
      };
      this.setData({polyvPlayer: polyv.getVideo(obj)});
    }else{
      this.setData({src:this.data.itemInfo.VideoUrl})
    }
    this.getVideoContext();
  },

  // 增加阅读次数
  async saveViewTimes(){
    let _this = this;
    let res = await Server.saveViewTimes({id:this.data.itemInfo.Id});
      if(res.Result){
      }
  },

  // 实例化一个操作 组件示例
  getVideoContext: function () {
    var _this = this
    this.setData({
      player:wx.createVideoContext('myVideo', this)
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
    this.data.player.playbackRate(num)
    this.setData({ showRateStatus: false })
  },

  videoErrorCallback(e) {
    console.log(' 错误信息:')
    console.log(e.detail.errMsg)
  },

  // 播放进度变化
  timeupdate: function(e) {
    wx.setStorageSync(this.data.itemInfo.Id, e.detail.currentTime)
  },

  //y 元数据加载完成
  loadedmetadata:function (e){
    console.log(' 元数据加载完成')
    var currTime = wx.getStorageSync(this.data.itemInfo.Id)
      if(currTime){
        this.data.player.seek(currTime)
      }
      this.data.player.play()
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
      this.data.polyvPlayer.destroy();
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