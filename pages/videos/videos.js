//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    loading:false,
    currentTab:0,
    bannerList:[
        {id:1,url:"http://image.beegoedu.com/Upload/haibaolink/2018103095288.jpg"}
    ],
    list:[],
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

    this.setData({
      list:[1,2,3,4]
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handlerOnChangeTab:function(event){
    var c = event.detail.index;
    this.setData({
      list:[c+1,c+2,c+3,c+4],
      currentTab:event.detail.index
    });
  },

  // 加载更多数据
  getDataList: function (){
    var result = [[1,2,3,4]];
    this.setData({
      list:this.data.list.concat(result),
      loading:false
    });
  },

  // 触底加载
  onReachBottom: function() {
    this.setData({loading:true})
    this.getDataList();
  },
})
