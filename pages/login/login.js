// pages/login/login.js
import Config from '../../utils/config.js'
import Request from '../../utils/request.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    showModal:false, // 微信确认授权弹窗
    isUserAuth:false, // 是否已授权用户信息
    loginStatus:true, // 是否勾选
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    encryptedData:"",
    iv:"",
    rawData:"",
    signature:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  // 获取手机号
  getPhoneNumber(e){
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权获取手机号',
        success: function (res) { }
      })
    } else {
      this.setData({
        encryptedData:e.detail.encryptedData,
        iv:e.detail.iv
      })
      this.getPhoneNumberShow()
    }
  },

  // 解密手机号
  getPhoneNumberShow:function(){
    var _this = this;
      wx.showLoading({
        title: '数据获取中...',
      });

      const params = {
        "rawData":this.data.rawData,
        "signature":this.data.signature,
        "encryptedData":this.data.encryptedData,
        "iv":this.data.iv,
        "token":wx.getStorageSync(Config.authToken)
      };
      Request({
        url: "Weixin/GetPhone",
        type: "post",
        data: params
      }).then((data) => {
        if(data.mobile){
          app.globalData.mobile = data.mobile;
          app.globalData.userInfo = _this.data.userInfo;
          wx.navigateBack({
            delta: 1
          })
        }
        _this.setData({
          showModal:false
        })
      })
      wx.hideLoading();
  },

  // 获取用户基本信息，一键登录
  bindGetUserInfo(e){
    this.setData({ showModal: false });
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权获取用户信息',
        success: function (res) { 
        }
      })
    } else{
      this.setData({
        signature:e.detail.signature,
        rawData:e.detail.rawData,
        userInfo: e.detail.userInfo
      })
      this.userLogin();
    }
  },

  // 获取用户基本信息
  // getUserinfo(){
  //   let _this = this;
  //   wx.getUserInfo({
  //     success: async function (res) {
  //       console.log("222222",res.userInfo)
  //       app.globalData.userInfo = res.userInfo
  //       _this.setData({
  //         signature:res.signature,
  //         rawData:res.rawData
  //       })
  //       _this.userLogin();
  //     },
  //     fail:function(){
  //       _this.setData({
  //         showModal: true
  //       });
  //     }
  //   })
  // },

  // 登录 code换取登录态信息（openid,sessionKey）
  userLogin(){
    var _this = this;
    wx.showLoading({
      title: '数据获取中...',
    });
    const params = {
      "code": wx.getStorageSync(Config.jsCodeKey),
      // "rawData":this.data.rawData,
      // "signature":this.data.signature,
      // encryptedData:this.data.encryptedData,
      // iv:this.data.iv
    };
    Request({
      url: "Weixin/Lonin",
      type: "post",
      data: params
    }).then((data) => {
      //wx.setStorageSync(Config.openIdKey, data.openid)
      //wx.setStorageSync(Config.sessionKey, data.session_key)
      wx.setStorageSync(Config.authToken, data.token)
      if(data.mobile!="" && data.mobile!=null){
        app.globalData.mobile = data.mobile
        app.globalData.userInfo = _this.data.userInfo;
        wx.navigateBack({
          delta: 1
        })
      }else{
        this.setData({showModal:true})
      }
    })
    wx.hideLoading();
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