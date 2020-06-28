var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    mobile:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let wxSession = wx.getStorageSync("authToken") // token是否存在
     if(wxSession=="" || wxSession==null || wxSession == undefined){
      wx.navigateTo({
        url: '/pages/login/login',
      })
     }else{
      this.setData({
        userInfo:app.globalData.userInfo,
        mobile:app.globalData.mobile || wx.getSystemInfoSync(Config.wxMobile)
      })
     }
  },

  // 退出登录
  loginOut(){
    wx.clearStorageSync();
    wx.switchTab({
      url: '/pages/my/mine/mine',
    })
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