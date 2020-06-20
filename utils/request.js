import Config from './config.js'
import Util from './util';
const app = getApp()

export default function(obj) {
  let parameter = {
    url: "",
    type: "GET",
    dataType: "json",
    headers: {
     "Content-type": 'application/json' , //"application/x-www-form-urlencoded"
    },
    data: {}
  }
  parameter = Object.assign(parameter, obj);

  //将config文件中的常量整合进来
  parameter.headers = Object.assign(parameter.headers, Config.headers);
  parameter.headers.ApiToken = wx.getStorageSync(Config.authToken) || '';
  if (parameter.url.indexOf('Weixin/Lonin') == -1) {

   
    // parameter.headers.userId = wx.getStorageSync(Config.userIdKey) || '';
  }

//判断头类型是否json,如果是则需要转一下参数类型
  if(parameter.headers['Content-type'] === 'application/json'){
   // parameter.data = JSON.stringify(parameter.data);
  }

  return new Promise(function(resolve, reject) {
    console.log('发送请求:', parameter.url, '参数:', parameter)
    wx.request({
      header: parameter.headers,
      method: parameter.type,
      url: Config.apiAppName(parameter.url),
      dataType: parameter.dataType,
      data: parameter.data,
      fail: function() {
        reject("失败了");
        wx.showToast({
          title: "服务请求超时",
          icon: 'none',
          duration: 2000
        })
      },
      success: function (res) {
        let  data = res.data;
        let statusCode = res.statusCode;
        console.log('后端返回数据:', data)
        if (statusCode == 502 || statusCode== 503){
          wx.showToast({
            title: "服务器升级中，请稍后再试",
            icon: 'none',
            duration: 2000
          })
          reject("失败了");
        } else{
          // if(!data || !data.succeed) {
          //   console.log('请求接口报错-->', parameter.url, data.errmsg)
          //   if (data.errmsg == "request header的token参数不能为空,请先登录" || data.errmsg == "token 校验失败，请先登录"){
          //     //过期清除所有缓存
          //     let referrerId = wx.getStorageSync(Config.referrerIdKey);
          //     wx.clearStorageSync();
          //     wx.setStorageSync(Config.referrerIdKey, referrerId);
              
          //     let pages = getCurrentPages();
          //     if (app.globalData.isReturnLogin !== true) {
          //       app.globalData.isReturnLogin = true;
          //       wx.navigateTo({
          //         url: '/pages/login/login?from=' + pages[pages.length - 1].route,
          //       })
          //       setTimeout(() => {
          //         app.globalData.isReturnLogin = false;
          //       }, 2000)
          //     } else {
          //       //解决页面触发太多需要校验token的请求，重复跳转到登录页问题
          //       setTimeout(() => {
          //         app.globalData.isReturnLogin = false;
          //       }, 2000 )
          //     }
          //   }
          // }
          resolve(data);
        }
      }
    });
  })

  // return new Promise(function(resolve, reject) {
  //   console.log('发送请求:', parameter.url, '参数:', parameter)
  //   wx.request({
  //     header: parameter.headers,
  //     method: parameter.type,
  //     url: Config.apiAppName(parameter.url),
  //     dataType: parameter.dataType,
  //     data: parameter.data,
  //     fail: function() {
  //       reject("失败了");
  //       wx.showToast({
  //         title: "服务请求超时",
  //         icon: 'none',
  //         duration: 2000
  //       })
  //     },
  //     success: function ({ data, statusCode}) {
  //       console.log('后端返回数据:', data)
  //       if (statusCode == 502 || statusCode== 503){
  //         wx.showToast({
  //           title: "服务器升级中，请稍后再试",
  //           icon: 'none',
  //           duration: 2000
  //         })
  //         reject("失败了");
  //       } else{
  //         if(!data || !data.success) {
  //           console.log('请求接口报错-->', parameter.url, data.msg)
  //           if (data.msg == "request header的token参数不能为空,请先登录" || data.msg == "token 校验失败，请先登录"){
  //             //过期清除所有缓存
  //             let referrerId = wx.getStorageSync(Config.referrerIdKey);
  //             wx.clearStorageSync();
  //             wx.setStorageSync(Config.referrerIdKey, referrerId);
              
  //             let pages = getCurrentPages();
  //             if (app.globalData.isReturnLogin !== true) {
  //               app.globalData.isReturnLogin = true;
  //               wx.navigateTo({
  //                 url: '/pages/biz/login/login?from=' + pages[pages.length - 1].route,
  //               })
  //               setTimeout(() => {
  //                 app.globalData.isReturnLogin = false;
  //               }, 2000)
  //             } else {
  //               //解决页面触发太多需要校验token的请求，重复跳转到登录页问题
  //               setTimeout(() => {
  //                 app.globalData.isReturnLogin = false;
  //               }, 2000 )
  //             }
  //           }
  //         }
  //         resolve(data);
  //       }
  //     }
  //   });
  // })
}