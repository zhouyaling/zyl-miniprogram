// pages/my/collection/collection.js
import Server from './wrongQuestionsServer'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      id:1,
      title:'营养失调：高于或低于机体需要量。'
    },{
      id:2,
      title:'潜在并发症：脑疝、肺部感染、泌尿系统感染、压疮、应激性溃疡、静脉血栓。'
    },{
      id:3,
      title:'气体交换受损：与左心衰竭引起肺循环淤血有关 4、体液过多：与心力衰竭引起水钠潴留有关。'
    },{
      id:4,
      title:'疼痛：与心肌缺血、缺氧有关。'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getMyQuestions()
  },

  // 获取我的错题列表
  async getMyQuestions(){
    let _this = this;
    let res = await Server.getMyQuestions({questiontype:'错题'})
      if(res.Result){
        this.setData({list:res.Result})
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