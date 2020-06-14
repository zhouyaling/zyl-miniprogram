// pages/news/news.js
import Server from './videosServer' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classId:"", // 班级类别id
    className:'',
    classPeopleNum:0,
    activeZhangId: '', // 章节id
    zhangList:[],
    list:[]
  },

  // 切换手风琴卡
  onChange(event) {
    debugger
    this.setData({
      activeZhangId: event.detail,
    });
    this.getPageList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.classId){
      this.setData({
        classId:options.classId,
        className:options.name,
        classPeopleNum:options.num
      })
    }
    this.getZhangList()
  },

  // 查询章节列表
  async getZhangList(){
    let _this = this;
    let res = await Server.getZhangList({'课程类别id': _this.data.classId});
      if(res.Result && res.Result.length>0){
        let cacheRes = [];
        res.Result.forEach(element => {
          cacheRes.push({...element,requested:false})
        });
        _this.setData({
          zhangList:cacheRes,
          activeZhangId:cacheRes[0].Id
        })
        _this.getPageList()
      }
  },

  // 查询视频列表
  async getPageList(){
    let _this = this;
    let res = await Server.getPageList({'课程章节id': _this.data.activeZhangId});
      if(res.Result && res.Result.length>0){
        let cacheRes = _this.data.zhangList.map(element => {
          if(element.Id == _this.data.activeZhangId){
              element.children = res.Result,
              element.requested = true
          }
          return element;
        });
        debugger
        _this.setData({
          zhangList:cacheRes
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