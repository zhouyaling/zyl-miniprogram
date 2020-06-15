import Server from "./detailServer"
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    detail:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    });
    this.loadArticleDetail();
  },

  //  加载咨询详情
  async loadArticleDetail(){
    let _this = this;
    let res = await Server.getNewForm({id:this.data.id});
      if(res.Result){
        WxParse.wxParse('article','html',res.Result.NewsContent,this,0)
        _this.setData({
          detail:{
            NewsTitle:res.Result.NewsTitle,
            ViewTimes:res.Result.ViewTimes,
            NewsDate:res.Result.NewsDate
          }
        })
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