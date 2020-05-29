//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo:{},
    isLogin:0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
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
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
    }
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let wxSession = wx.getStorageSync("authName") // token是否存在

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
      hasUserInfo: true
    })
  }
})
