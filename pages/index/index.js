import Server from './indexServer'

//获取应用实例
const app = getApp()

Page({
  data: {
    currentTab: 1,
    mark:false,
    videoType:[], // 栏目列表
    bannerList:[
      {Id:1,imgurl:""}],
    list:[],
    listSpec:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    weizhuang:false,
  },

  onLoad: function () {
   
    this.getVideoType();
    this.getBanner();
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    // }
  },

   // 获取轮播图
   async getBanner(){
    let _this = this;
    let res = await Server.getBannerList({module:'视频'});
      if(res.Result && res.Result.length>0){
        _this.setData({
          bannerList:res.Result
        })
      }
  },
    
  // 获取专题栏目
  async getVideoType() {
    let _this = this;
    let res = await Server.getVideoType({DictType:'VideoType'});
      if(res.Result && res.Result.length>0){
        _this.setData({
          videoType:res.Result[0].Detail,
          currentTab:res.Result[0].Detail[0].DictKey,
        })
        _this.getClassList()
      }
  },

    // 获取精品课程班
  async getClassList(){
    let _this = this;
    let res = await Server.getClassList({'课程专题Code':_this.data.currentTab,'classtype':'视频'});
      if(res.Result){
        _this.setData({
          listSpec: res.Result.length>0 ? res.Result:[],
        })
      }
  },


  // 跳转到也没
  goVideo:function (e){
    if(this.data.weizhuang){
      return
    }
    wx.navigateTo({
      url: '/pages/classes/classes?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 切换顶部专题
  handlerOnChangeTab:function(event){
    this.setData({
      list:[],
      currentTab:event.detail.name
    });
    this.getClassList()
  },

  
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function() {
    this.getClassList()
    wx.stopPullDownRefresh();
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
    this.setData({weizhuang:app.globalData.allWeiZhuang})

    // 动态设置菜单（已取消）
    // if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    //   this.getTabBar().setData({
    //     selected: 1  //这个数字是当前页面在tabBar中list数组的索引
    //   })
    // }
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
