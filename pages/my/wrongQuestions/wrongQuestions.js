// pages/my/collection/collection.js
import Server from './wrongQuestionsServer'
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
  onLoad: function () {
    this.getMyQuestions()
  },

  // 获取我的错题列表
  async getMyQuestions(){
    let _this = this;
    _this.setData({loading:true})
    let res = await Server.getMyQuestions({questiontype:'错题'})
    this.setData({loading:false})
      if(res.Result){
        this.setData({list:res.Result})
      }
    
  },

   // 查看收藏详情
   goQuestions(e){
    wx.navigateTo({
      url: '/pages/questions/questions?questionType=6&currQ=' + e.currentTarget.dataset.id,
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