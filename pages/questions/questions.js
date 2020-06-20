import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Server from './questionsServer'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0, // 0 答题模式 1 解析模式
    id:0, // 试卷id
    paperid:0, // 试卷id
    chapter:"", // 章节名称
    jieid:"", // 小结id
    title:"", // 名称
    answeredStatus:false, // 是否提交答题
    showPops:false, // 展示答题卡弹窗
    currQ:0, // 当前题目
    collection:false, // 收藏状态
    totalQuestion:0, // 题目总数
    list:[], // 题目集合
    rightAnswerNum:0, // 正确答案个数
    rightAnswerRate:0, // 得分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = {};
    if(options.paperid && options.paperid!="undefined"){
      this.setData({
        paperid:options.paperid
      })
      params = {'试卷id': this.data.paperid}
    }
    if(options.chapter && options.chapter!="undefined"){
      this.setData({chapter:options.chapter})
      params = {...params,'章节名称': this.data.chapter}
    }
    if(options.jieid && options.jieid!="undefined"){
      this.setData({jieid:options.jieid})
      params = {...params,'课程id': this.data.jieid}
    }
    this.getExamList(params);
  },

  // 获取试题列表
  async getExamList(params){
    let _this = this;
    let res = await Server.getExamList(params);
    console.log(res)
    let cacheRes=[]
    if(res.Result && res.Result.length>0){
      cacheRes = res.Result.map(element => {
          return {...element,choosedAnswer:"",choosedText:""}
      });

      _this.setData({
        loading:false,
        totalQuestion:res.TotalCount,
        title:cacheRes[0].Paper,
        list:cacheRes,
      })
    }else{
      _this.setData({
        loading:false,
        totalQuestion:0,
        title:"",
        list:[],
      })
    }
  },

  

  // 答题
  chooseAnswer:function(e){
      let aid = e.currentTarget.dataset.aid;
      let atext = e.currentTarget.dataset.atext;
      this.data.list.forEach(element => {
      if(element.Id==e.currentTarget.dataset.qid){
        if(e.currentTarget.dataset.type=="单选题"){
          element.choosedAnswer = aid,
          element.choosedText = atext
        }else{
          if(element.choosedAnswer.indexOf(aid)<0){
            element.choosedAnswer +=(( element.choosedAnswer ? ',':'') + aid)
          }
          if(element.choosedText.indexOf(atext)<0){
            element.choosedText +=(( element.choosedText ? ',':'') + atext)
          }
          
        }
      }
    });

    this.setData({
      list:this.data.list
    })
  },

  // 提交答案
  submitAnswer:function(){
    if(!this.data.answeredStatus){
      Toast.loading({
        mask: false,
        forbidClick:true,
        duration:500,
        message: '答案提交中...',
      });
      this.setData({
        answeredStatus:true,
        showPops:true
      })
      this.staticsRightAnswer();
    }else{
        Toast.loading({
          mask: false,
          forbidClick:true,
          duration:500,
          message: '您已提交过答案了哦~',
        });
      }
  },

  // 统计答案
  staticsRightAnswer:function (){
    let cacheNum  =0;
    this.data.list.forEach(element => {
        if(element.Answer==element.chooseAnswer){
            cacheNum +=1;
        }
    });
    this.setData({
      rightAnswerNum:cacheNum,
      rightAnswerRate:parseFloat(cacheNum / this.data.totalQuestion).toFixed(2) * 100
    })
  },

  // 查看答题解析、关闭弹窗
  showAnswerDetail: function(e){
  
    if(e.currentTarget.dataset.type==1){  // 关闭
      this.popsOnClose();
    //  if(this.data.answeredStatus){
    //   wx.navigateBack({
    //     delta:1,
    //   });
    //  }
    }else if(e.currentTarget.dataset.type==0){ // 查看答题解析
      this.popsOnClose();
      this.setData({
        currQ:0,
        type:1
      })
    }
  },

  
  // 关闭答题卡
  popsOnClose(){
    this.setData({
      showPops:false
    })
  },

  // 答题菜单切换
  menuOnChange:function(event){
    switch(event.detail){
      case 0:
         wx.navigateBack({
          delta:  1,
        })
        break;
        case 1:
         this.backAction();
          break;
        case 2:
          this.collectionAction();
          break;
        case 3:
        this.nextAction();
        break;
      case 4:
        this.setData({
          showPops:true
        })
    }
  },
  
  // 上一题
  backAction:function (){
    this.setData({
      currQ:this.data.currQ<=1?0:this.data.currQ - 1
    })
  },

  // 下一题
  nextAction:function (){

    // 提示已经答完
    if(this.data.currQ==this.data.totalQuestion-1){
      if(this.data.type==1 ){
        Dialog.alert({
          className:'test',
          message: '已经是最后一题啦~',
        }).then(() => {
        });
      }else{
        if(this.data.answeredStatus){
          Dialog.confirm({
            message: '你已经提交过答案啦，是否查看解析？',
          })
          .then(() => {
            this.setData({ showPops:true })
              Dialog.close();
          })
          .catch(() => {
            Dialog.close();
          });
          
        }else{
          Dialog.confirm({
            message: '已经是最后一题啦，是否提交？',
          })
            .then(() => {
              this.submitAnswer();
                Dialog.close();
            })
            .catch(() => {
              Dialog.close();
            });
        }
      }
    }
    this.setData({
      currQ:(this.data.currQ + 1)>=this.data.totalQuestion?(this.data.totalQuestion-1):this.data.currQ+1
    })
  },

  // 收藏
  collectionAction:function(){
    Toast({
      mask: false,
      forbidClick:true,
      message: '收藏成功!',
      duration:1000,
      onClose:function(){

      }
    });
    this.setData({
      collection:!this.data.collection
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