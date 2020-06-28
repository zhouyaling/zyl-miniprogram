// pages/my/study/study.js
import Server from './studyServer'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyClassList()
  },

  // 跳转到视频也没
  goVideo:function (e){
    wx.navigateTo({
      url: '/pages/videos/videos?item=' + JSON.stringify(e.currentTarget.dataset.item), // url="/pages/videos/videos?item={{}}"
    })
  },

  // 获取我的课程
  async getMyClassList(){
    let _this = this;
    _this.setData({loading:true})
    let res = await Server.getMyClassList({})
      var cacheMyClassIds =[];
      if(res.Result && res.Result.length>0){
        res.Result.forEach(element => {
          cacheMyClassIds.push(element.Id)
        });
        _this.setData({
          list:res.Result,
          loading:false,
        })
      }else{
        _this.setData({
          loading:false,
        })
      }
      wx.setStorageSync('myClassIds', cacheMyClassIds.length>0 ? cacheMyClassIds.join(',') : "")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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