// pages/library/library.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      id:1,
      status:true,
      totalInfo:{
        name:'第一章 金科大社区',
        total:100,
        actived:65,
      },
      children:[
        {
          id:11,
          name:'第一节 金科大社区',
          total:50,
          actived:25,
        },
        {
          id:12,
          name:'第二节 金科大社区',
          total:50,
          actived:40,
        }
      ]
    },
    {
      id:2,
      status:false,
      totalInfo:{
        name:'第二章 金科大社区',
        total:100,
        actived:65,
      },
      children:[
        {
          id:21,
          name:'第一节 金科大社区',
          total:50,
          actived:25,
        }
      ]
    },{
      id:3,
      status:false,
      totalInfo:{
        name:'第三章 金科大社区',
        total:100,
        actived:65,
      },
        children:[]
    }]
  },

  /**
   * 章节展开
   */
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

  /**
   * 开始答题
   */
  goQuestion(e){
    if(!e.currentTarget.dataset.item){
      return
    }
    wx.navigateTo({
      url: '../questions/questions?id=' + e.currentTarget.dataset.item.id,
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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