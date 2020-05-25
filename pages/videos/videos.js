//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentTab:0, // 当前类型
    bannerList:[
        {id:1,url:"http://image.beegoedu.com/Upload/haibaolink/2018103095288.jpg"}
    ],
    list:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    loading:false, // 是否正在加载
    pageNum:1,
    pageSize:7,
    hasMoreData: true, //  是否有更多数据
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

    this.getDataList();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 切换选项
  handlerOnChangeTab:function(event){
    var c = event.detail.index;
    this.setData({
      list:[c+1,c+2,c+3,c+4,c+4,c+6,c+7],
      currentTab:event.detail.index
    });
  },

  // 加载更多数据
  getDataList: function (){
    var c = this.data.pageNum;
    var result = [c+1,c+2,c+3,c+4,c+4,c+6,c+7];
    this.setData({loading:true});
    var _this = this;
    setTimeout(function(){
      _this.setData({
        list:_this.data.list.concat(result),
        loading:false,
        pageNum:_this.data.pageNum + 1
      });
    },1000);
  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function() {
    // console.log('下拉加载')
    // this.setData({
    //   pageNum:1,
    //   list:[]
    // })
    // this.getDataList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData && this.data.pageNum<=6) {
      this.getDataList();
    } else {
      wx.showToast({
        title: '没有更多数据啦~',
      })
    }
  },
})
