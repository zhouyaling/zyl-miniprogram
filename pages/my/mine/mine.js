//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    weizhuang:false,
    userInfo:{},
    mobile:"",
    isLogin:0,
    motto: 'Hello World',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo;
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
    }
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({weizhuang:app.globalData.allWeiZhuang})
    
    // 动态设置菜单（已取消）
    // if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    //   this.getTabBar().setData({
    //     selected: app.globalData.barList.length==4 ? 3 :1 //这个数字是当前页面在tabBar中list数组的索引
    //   })
    // }

    let wxSession = wx.getStorageSync("authToken") // token是否存在

    if(wxSession=="" || wxSession==null || wxSession == undefined){
        this.setData({
          isLogin:0
        })
    }else{
      this.setData({
        isLogin:1
      })
      // 获取用户信息
      this.getUserInfo()
    }
  },
    // 获取用户信息
    // async getUserInfo(params) {
    //   let resule = await Serv.getUserInfo(params)
    //   if (resule.success) { // 用户信息获取成功
    //     this.setData({ userInfo: resule.data })
    //   }
    // },
  getUserInfo: function() {
    this.setData({
      userInfo:  app.globalData.userInfo,
      mobile:app.globalData.mobile,
    })
  },

  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
