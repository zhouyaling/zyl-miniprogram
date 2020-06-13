// pages/news/news.js
import Server from './libraryGroupsServer' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    classId:"", // 班级类别id
    className:'',
    classPeopleNum:0,
    activeZhangId: '', // 章节id
    zhangList:[],
    list:[{
        id:1,
        status:true,
        totalInfo:{
          name:'第一章大社区',
          total:100,
          actived:65,
        },
        children:[
          {
            id:11,
            name:'第一节 大社区',
            total:50,
            actived:25,
          },
          {
            id:12,
            name:'第二节 大社区',
            total:50,
            actived:40,
          }
        ]
      },
      {
        id:2,
        status:false,
        totalInfo:{
          name:'第二章 大社区',
          total:100,
          actived:65,
        },
        children:[
          {
            id:21,
            name:'第一节 大社区',
            total:50,
            actived:25,
          }
        ]
      },{
        id:3,
        status:false,
        totalInfo:{
          name:'第三章 大社区',
          total:100,
          actived:65,
        },
          children:[]
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.Id){
      this.setData({
        classId:options.Id,
        className:options.name,
        classPeopleNum:options.people
      })
    }
    this.getZhangList()
  },

  // 修改
  onChange(event) {
    this.setData({
      activeZhangId: event.detail,
    });
    this.getPageList()
  },


  // 查询章节列表
  async getZhangList(){
    let _this = this;
    _this.setData({loading:true,zhangList:[]})
    let res = await Server.getZhangList({'课程类别id': _this.data.classId});
      if(res.Result && res.Result.length>0){
        debugger
        _this.setData({
          loading:false,
          zhangList:res.Result,
          activeZhangId:res.Result[0].Id
        })

        // _this.getPageList()
      }
  },

  // 查询视频列表
  async getPageList(){
    let _this = this;
    _this.setData({
      list:[]
    })
    let res = await Server.getPageList({'课程章节id': _this.data.activeZhangId});
      if(res.Result && res.Result.length>0){
        _this.setData({
          list:res.Result
        })
      }
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