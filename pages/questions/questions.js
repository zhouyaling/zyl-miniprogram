import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    answeredStatus:false, // 是否提交答题
    showPops:false, // 展示答题卡弹窗
    currentQuestion:0, // 当前题目
    collection:false, // 收藏状态
    totalQuestion:2, // 题目总数
    questionList: // 题目集合
      {
        total:10,
        list:[
          {
            id:1,
            showAnswer:false,
            choosedAnswer:"",
            answer:"C",
            title:'列表中唯一的字符串或者或者数字，且不会发生改变。',
            answerList:[{
              id:'A',
              title:'大管家'
            },{
              id:'B',
              title:'大蛇去'
            },
            {
              id:'C',
              title:'周烤猫'
            },{
              id:'D',
              title:'安居客'
            }],
          },
          {
            id:2,
            showAnswer:false,
            choosedAnswer:"",
            answer:"D",
            title:'当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表。',
            answerList:[{
              id:'A',
              title:'大管家'
            },{
              id:'B',
              title:'大蛇去'
            },
            {
              id:'C',
              title:'周烤猫'
            },{
              id:'D',
              title:'安居客'
            }],
          }
        ]
      }
  },

  // 答题
  chooseAnswer:function(e){
    this.data.questionList.list.forEach(element => {
      if(element.id==e.currentTarget.dataset.qid){
        element.choosedAnswer = e.currentTarget.dataset.aid
      }
    });

    this.setData({
      questionList:this.data.questionList
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
    }
   
  },

  // 查看答题解析、关闭弹窗
  showAnswerDetail: function(e){
    if(e.currentTarget.dataset.type==1){
      this.popsOnClose();
    }
    else{
      this.popsOnClose();
      wx.redirectTo({
        url: '/pages/answers/answers',
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
      currentQuestion:this.data.currentQuestion<=1?0:this.data.currentQuestion - 1
    })
  },

  // 下一题
  nextAction:function (){

    // 提示已经答完
    if(this.data.currentQuestion==this.data.totalQuestion-1){
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
    this.setData({
      currentQuestion:(this.data.currentQuestion + 1)>=this.data.totalQuestion?(this.data.totalQuestion-1):this.data.currentQuestion+1
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.id){
      this.setData({
        id:options.id
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