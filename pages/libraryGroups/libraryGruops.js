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
    examList1:[], // 真题试卷数据集合
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
    if(e.currentTarget.dataset.paperid || e.currentTarget.dataset.chapter || e.currentTarget.dataset.jieid){
      wx.navigateTo({
        url: '../questions/questions?questionType='+ this.data.currentTab +'&paperid=' + e.currentTarget.dataset.paperid + '&chapter=' +  e.currentTarget.dataset.chapter+ '&jieid=' +  e.currentTarget.dataset.jieid,
      })
    }
  },

  // 切换顶部菜单
  onChange(event) {
    this.setData({
      currentTab:event.detail.name
    });
    
    if((this.data.currentTab==1 || this.data.currentTab==3) && this.data.zhangList.length<=0){
      this.getZhangList();
    }else if(this.data.currentTab==2 && this.data.examList.length<=0){
      this.getPaperList()
    }else if(this.data.currentTab==4  && this.data.examList1.length<=0){
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
      }else{
        _this.setData({loading:false})
      }
  },

  // 查询小结列表
  async getPageList(){
    let _this = this;
    
    let res = await Server.getPageList({'课程章节id': _this.data.activeZhangId});
      if(res.Result && res.Result.length>0){
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

  // 查询模拟考试或者历年真题列表
  async getPaperList(){
    let _this = this;
    _this.setData({loading:true})
    let params = {'课程班次id':this.data.classId};
    if(this.data.currentTab==2){
      params = {...params,'试卷类型':'模拟考试'};
    } else if(this.data.currentTab==4){
      params = {...params,'试卷类型':'历年真题'};
    }
    
    let res = await Server.getPaperList(params);
      if(res.Result && res.Result.length>0){
        if(this.data.currentTab=='2'){
          this.setData({
            loading:false,
            examList:res.Result
          })
        }
        
        else if(this.data.currentTab=='4'){
          this.setData({
            loading:false,
            examList1:res.Result
          })

        }
      }else{
        this.setData({loading:false})
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