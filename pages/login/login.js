// pages/login/login.js
import Config from '../../utils/config.js'
import Request from '../../utils/request.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false, // 微信确认授权弹窗
    isUserAuth:false, // 是否已授权用户信息
    loginStatus:true, // 是否勾选
    encryptedData:"",
    iv:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    debugger
    // 判断是否同意授权
    let _this = this;
      wx.getSetting({
        success(res){
          let authorizeList = res.authSetting;
          _this.setData({
              isUserAuth:authorizeList["scope.userInfo"]
            })
        }
      })
  },

  /**
   * 勾选协议
   */
  checkboxChange(e){
    console.log(e.detail.value)
      this.setData({
        loginStatus:e.detail.value.length>=1?false:true
      })
  },

  /**
   * 微信一键登录
   */
  getPhoneNumber(e){
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      this.setData({
        encryptedData:e.detail.encryptedData,
        iv:e.detail.iv
      })
      if(this.data.isUserAuth){
        this.getUserinfo()
       }else{
         this.setData({
           showModal: true
         });
       }
    }
  },

  /**
   * 获取用户基本信息
   */
  getUserinfo(e){
    debugger
    let _this = this;
    wx.getUserInfo({
      success: async function (res) {
        _this.setData({
          showModal: false
        });
        wx.showLoading({
          title: '数据获取中...',
        });

         // code换取登录态信息（openid,sessionKey）
        const params = {
          "code": wx.getStorageSync(Config.jsCodeKey)
        };
        Request({
          url: "Weixin/get",
          type: "get",
          data: params
        }).then((data) => {
          wx.setStorageSync(Config.openIdKey, data.openid)
          wx.setStorageSync(Config.sessionKey, data.session_key)
          // wx.setStorageSync(Config.userInfoKey, res.userInfo)
          wx.setStorageSync(Config.authName, data.userid)
          app.globalData.userInfo = res.userInfo
          wx.navigateBack({
            delta: 1
          })

          // if(result.success){
          //   let data = result.data;
          //   wx.setStorageSync(Config.openIdKey, data.openId)
          //   wx.setStorageSync(Config.sessionKey, data.sessionKey)

          //   wx.navigateBack({
          //     delta: 1
          //   })
          // }else{
          //   wx.login({
          //     success: res => {
          //       wx.setStorageSync(Config.jsCodeKey, res.code)
          //     }
          //   })
          // }
        })
        wx.hideLoading();
      },
      fail:function(){
        _this.setData({
          showModal: false
        });
      }
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
    wx.login({
      success: res => {
        console.log('relogin:', res.code);
        wx.setStorageSync(Config.jsCodeKey, res.code)
      }
    })
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