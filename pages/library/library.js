import Server from './libraryServer'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    currentTab: 1, // 当前专题
    activeZhangId:"", // 当前选择的章id
    videoType:[], // 专题列表 
    list:[], // 章列表
    listSpec:[] // 班次列表
  },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoType();
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

  // 获取班次列表
  async getClassList(){
    let _this = this;
    let res = await Server.getClassList({'课程专题Code':_this.data.currentTab});
      if(res.Result && res.Result.length>0){
        _this.setData({
          loading:false,
          listSpec:res.Result,
          activeZhangId:res.Result[0].Id
        })
      }else{
        _this.setData({
          loading:false,
          listSpec:[],
        })
      }
  },

  
  // 查小节列表
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

   // 切换顶部专题
   handlerOnChangeTab:function(event){
    this.setData({
      listSpec:[],
      loading:true,
      currentTab:event.detail.name
    });
    this.getClassList()
  },

  // 章节展开
  arrowClick(e){
    let currid = e.currentTarget.dataset.item.id;
    let qq = this.data.list.map(function(ele){
        if(ele.id==currid){
          ele.status = !ele.status;
        }else{
          ele.status = false;
        }

        return ele;
    })
    this.setData({
      list:qq
    })
  },

  // 去学
  goStudy:function(e){
    var loginStatus = wx.getStorageSync('authToken')
    if(!loginStatus){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: "您还未登录",
        success: function (res) { }
      })
      return;
    }
     var res = e.currentTarget.dataset.item;
    // var classIds = wx.getStorageSync("userClasses");
    // if(classIds.indexOf(res.Id)<0){
    //   wx.showModal({
    //     title: '提示',
    //     showCancel: false,
    //     content: "您没有查看当前班次权限，请联系您的老师",
    //     success: function (res) { }
    //   })
    //   return;
    // }

    wx.navigateTo({
      url: '/pages/libraryGroups/libraryGruops?name='+ res.Class + '&price='+res.ClassPrice + '&people=' + res.ClassPeopleNum + '&Id=' + res.Id,
    })
  },

  // 开始答题
  goQuestion(e){
    if(!e.currentTarget.dataset.item){
      return
    }
    wx.navigateTo({
      url: '../questions/questions?id=' + e.currentTarget.dataset.item.id,
    })
  },

  // 切换类型
  changeType:function(e){
    wx.showLoading({
        title:'加载中...'
    })
    this.setData({
      list:[]
    })

    this.setData({
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
    })
    wx.hideLoading()
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