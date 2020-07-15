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
          currentTab:res.Result[0].Detail[0].DictKey,
        })
        _this.getClassList()
      }
  },

  // 获取班次列表
  async getClassList(){
    let _this = this;
    let res = await Server.getClassList({'课程专题Code':_this.data.currentTab,'classtype':'题库'});
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

  
   // 切换顶部专题
   handlerOnChangeTab:function(event){
    this.setData({
      listSpec:[],
      loading:true,
      currentTab:event.detail.name
    });
    this.getClassList()
  },


  // 去学
  goStudy:function(e){
    var res = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/libraryGroups/libraryGruops?name='+ res.Class + '&price='+res.ClassPrice + '&people=' + res.ClassPeopleNum + '&Id=' + res.Id,
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2  //这个数字是当前页面在tabBar中list数组的索引
      })
    }
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
    this.getClassList();
    wx.stopPullDownRefresh();
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