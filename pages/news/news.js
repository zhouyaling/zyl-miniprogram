import Server from './newsServer';
//获取应用实例
const app = getApp()

Page({
  data: {
    currentTab:1, // 当前类型
    videoType:[], // 类型
    bannerList:[
        {id:1,url:"http://image.beegoedu.com/Upload/haibaolink/2018103095288.jpg"}
    ],
    list:[],
    
    loading:false, // 是否正在加载
    pageIndex:1, // 当前页
    pageSize:7, // 页码
    hasMoreData: true, //  是否有更多数据
  },
 
  onLoad: function () {
    this.getNewsType();
    this.getNewsList();

  },
  
  // 获取栏目
  async getNewsType() {
    let _this = this;
    let res = await Server.getNewsType({DictType:'NewsType'});
      if(res.Result && res.Result.length>0){
        _this.setData({
          videoType:res.Result[0].Detail
        })
      }

  },

  // 切换选项
  handlerOnChangeTab:function(event){
    this.setData({
      currentTab:event.detail.name,
      pageIndex:1,
      list:[],
      hasMoreData:true,
    });
    this.getNewsList();
  },

  // 加载更多数据
  async getNewsList(){
    this.setData({loading:true});
    let params = {
      NewsType:this.data.currentTab,
      PageSize:this.data.pageSize,
      PageIndex:this.data.pageIndex
    }

    let _this = this;
    let res = await Server.getNewsList(params);
      if(res.Result){
        _this.setData({
          list:_this.data.list.concat(res.Result),
          loading:false,
          pageIndex:_this.data.pageIndex + 1
        })
      }
  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function() {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData && this.data.pageIndex<=6) {
      this.getNewsList();
    } else {
      wx.showToast({
        title: '没有更多数据啦~',
      })
    }
  },
})
