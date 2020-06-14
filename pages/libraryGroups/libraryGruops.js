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
    currentTab:"1", // 当前菜单
    zhangList:[], // 章节数据集合
    examList:[], // 模拟试卷数据集合
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

  // 开始答题
   goQuestion(e){
    if(!e.currentTarget.dataset.chapter){
      return
    }
    wx.navigateTo({
      url: '../questions/questions?id=' + e.currentTarget.dataset.chapter,
    })
  },

  // 切换顶部菜单
  onChange(event) {
    this.setData({
      currentTab:event.detail.name
    });
    
    if((this.data.currentTab==1 || this.data.currentTab==3) && this.data.zhangList.length<=0){
      this.getZhangList();
    }else if((this.data.currentTab==2 || this.data.currentTab==4) && this.data.examList.length<=0){
      this.getPaperList()
    }
  },


  // 查询章节列表
  async getZhangList(){
    let _this = this;
    _this.setData({loading:true,zhangList:[]})
    let res = await Server.getZhangList({'课程类别id': _this.data.classId});
      if(res.Result && res.Result.length>0){
        let cacheRes = [];
        res.Result.forEach(element => {
          cacheRes.push({...element,children:[],requested:false,status:false})
        });
        _this.setData({
          loading:false,
          zhangList:cacheRes,
          activeZhangId:cacheRes[0].Id
        })

         _this.getPageList()
      }
  },

  // 查询小结列表
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

        _this.setData( {
            zhangList:_this.data.zhangList.map(function(item){
              if(item.Id==_this.data.activeZhangId){
                item.children = res.Result;
                item.requested =true,
                item.status = true
              }
              return item
            })
          });
      }
  },

  // 查询试卷列表
  async getPaperList(){
    let _this = this;
    debugger
    let res = await Server.getPaperList({});
      if(res.Result && res.Result.length>0){
        _this.setData({
          examList:res.Result
        })
      }
  },
  
  // 章节展开
  arrowClick(e){
    let _this = this;
    let currid = e.currentTarget.dataset.item.Id;
    let qq = this.data.zhangList.map(function(ele){
        if(ele.Id==currid){
          ele.status = !ele.status;
          if(!ele.requested){
            _this.setData({activeZhangId:currid})
            _this.getPageList();
          }
        }else{
          ele.status = false;
        }

        return ele;
    })
    this.setData({
      zhangList:qq
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