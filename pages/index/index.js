import Server from './indexServer'

//获取应用实例
const app = getApp()

Page({
  data: {
    currentTab: 1,
    mark:false,
    loading:false,
    videoType:[], // 栏目列表
    bannerList:[
      {Id:1,imgurl:""}],
    list:[],
    listSpec:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    this.getVideoType();
    this.getBanner();
    this.setData({
      list:[1,2,3,4],
      loading:true
    });
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
          currentTab:res.Result[0].Detail[0].DictKey
        })
        _this.getClassList()
      }
  },

    // 获取精品课程班
  async getClassList(){
    let _this = this;
    let res = await Server.getClassList({'课程专题Code':_this.data.currentTab});
      if(res.Result && res.Result.length>0){
        _this.setData({
          listSpec:res.Result,
        })
      }else{
        _this.setData({
          listSpec:[],
        })
      }
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
      list:[1,2,3,4],
      loading:true,
      currentTab:event.detail.name
    });
    this.getClassList()
  }
})
