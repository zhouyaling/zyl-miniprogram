// pages/my/collection/collection.js
import Server from "./collectionServer"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getMyQuestions()
  },

  // 获取我的收藏列表
  async getMyQuestions(){
    let _this = this;
    let res = await Server.getMyQuestions({questiontype:'收藏'})
    var cacheMyCollectionIds = [];
      if(res.Result){
        this.setData({list:res.Result})
        res.Result.forEach(element => {
          cacheMyCollectionIds.push(element.Id)
        });
      }
      // 缓存我的收藏ids
      wx.setStorageSync('myCollectionIds', cacheMyCollectionIds.length>0?cacheMyCollectionIds.join(','):'')
  },

  // 查看收藏详情
  goQuestions(e){
    var params = {
      questionType:5,
      currQ:e.currentTarget.dataset.id
    }
    wx.navigateTo({
      url: '/pages/questions/questions?params=' + JSON.stringify(params),
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
    this.getMyQuestions();
    wx.stopPullDownRefresh();
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