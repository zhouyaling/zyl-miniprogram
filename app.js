//app.js
// import plv from '/lib/polyv-sdk/index';
import tabBarList from './utils/tabBarList' 
import Request from './utils/request'

App({
  onLaunch: function () {
   
    // 动态设置底部导航菜单
    this.globalData.barList = tabBarList.allList;
   

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  onShow: function (){
    // console.log('app-onshow');
    this.getMiniProgrameStatus();
  },

  // 动态设置底部菜单
  getMiniProgrameStatus(){
    Request({
      url: "DataDict/GetList",
      type: "GET",
      data:{DictType:'wxset'}
    }).then((data) => {
     
     if(data.Result && data.Result.length>0 && data.Result[0].Detail[0].DictValue=='1'){
      this.globalData.barList = tabBarList.auditList;
     }
    })
  },

  globalData: {
    userInfo: null,
    mobile:null,
    isReturnLogin:false,
    barList:[] // 底部菜单列表
  }
})