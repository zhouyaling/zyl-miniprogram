// pages/news/news.js
import Server from './videosServer' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:"1",
    classId:"", // 班级类别id
    className:'',
    classPeopleNum:0,
    classPrice:0,
    classAuth:true, // 当前班次权限
    classInfo:{},
    activeZhangId: '', // 章节id
    zhangList:[],
    list:[]
  },

  // 切换手风琴卡
  onChange(event) {
    this.setData({
      activeZhangId: event.detail,
    });

    this.data.zhangList.forEach(element => {
        if(element.Id==this.data.activeZhangId && !element.requested){
          this.getPageList()
        }
    });
    
  },

  // 切换顶部菜单
  onChangeNav(event) {
    this.setData({
      currentTab:event.detail.name
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = JSON.parse(options.item)
    if(params.Id){
      this.setData({
        classId:params.Id,
        className:params.Class,
        classPeopleNum:params.ClassPeopleNum,
        classInfo:params,
        classPrice:params.ClassPrice
      })
    }
    this.getZhangList()

    var loginStatus = wx.getStorageSync('authToken')
    debugger
    if(!loginStatus){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "您还未登录",
        success: function (res) { }
      })
      return;
    }
    var userClass = wx.getStorageSync('userClasses');
    if(userClass.indexOf(this.data.classId)<0){
      this.setData({classAuth:false})
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "您没有查看当前班次权限，请联系您的老师",
        success: function (res) { }
      })
    }
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
    
    if(!this.data.classAuth){
      return;
    }
    let res = await Server.getPageList({'课程章节id': _this.data.activeZhangId,'课程班次id':_this.data.classId});
      if(res.Result && res.Result.length>0){
        let cacheRes = _this.data.zhangList.map(element => {
          if(element.Id == _this.data.activeZhangId){
              element.children = res.Result,
              element.requested = true
          }
          return element;
        });
        _this.setData({
          zhangList:cacheRes
        })
      }
  },

  // 跳转视频详情
  goVideoDetail: function (e){
    var videoItem = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/videoDetail/videoDetail?itemInfo=' + JSON.stringify(videoItem) + '&des=' + e.currentTarget.dataset.des,
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