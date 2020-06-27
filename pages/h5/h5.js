// pages/h5/h5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(options.type==1){
        this.setData({
          src:"https://mp.weixin.qq.com/s/Az25ZerF37dJTWqAZ3W6oA"
        })
      }else if(options.type==2){
        this.setData({
          src:"http://mp.weixin.qq.com/s?__biz=MzA5ODY1NDU4NA==&mid=100000099&idx=1&sn=6d0404c8598fe9f79612c53a6b4e1488&chksm=108f017427f8886250efbdd004d4f1c6cfa7ab7003fe257064d29519c73bb538f34922da0ae6#rd"
        })
      }else if(options.type==3){
      }
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