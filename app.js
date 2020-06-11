//app.js
// import plv from '/lib/polyv-sdk/index';

App({
  onLaunch: function () {
    // TODO: 传入直播后台获取的appId、appSecret
    // plv.setApp({
    //   apiId:'fo9ej350u0',
    //   apiSecret:'67180890349bd8851d3da33223ae4'
    // });

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })

    // 授权用户定位
    // wx.authorize({scope:"scope.userLocation",
    //   success:function(){
    //       wx.getLocation({
    //         success:function(res){
    //           console.log("纬度:"+res.latitude+"经度"+res.longitude);
    //         }
    //       })
    //   }
    // })

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
  globalData: {
    userInfo: null
  }
})