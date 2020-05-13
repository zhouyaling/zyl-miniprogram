// pages/my/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '2020-05-13',
        desc: '观看视频健康管理师',
      },
      {
        text: '2020-05-12',
        desc: '心功能不全病人的护理',
      },
      {
        text: '2020-05-06',
        desc: '观看视频健康管理师',
      },
      {
        text: '2020-05-02',
        desc: '观看视频健康管理师',
      },
    ],
  },

  sss(e){
    debugger
    wx.navigateTo({
      url: '/pages/videoDetail/videoDetail'
    })
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