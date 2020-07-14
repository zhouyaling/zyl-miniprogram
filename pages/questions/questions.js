import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Server from './questionsServer'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0, // 0 答题模式 1 解析模式
    questionType:"", // 问题来源类型： 1 章节练习 2 模拟真题 3 章节测试 4 历年真题 5 我的收藏 6 我的错题
    answeredStatus:false, // 是否提交答题
    id:0, // 试卷id
    paperid:0, // 试卷id
    chapter:"", // 章节名称
    jieid:"", // 小结id
    title:"", // 名称
    className:'', // 课程班次名称
    showPops:false, // 展示答题卡弹窗
    currQ:0, // 当前题目
    processStorage:[], // 历史答题集合
    totalQuestion:0, // 题目总数
    list:[], // 题目集合
    rightAnswerNum:0, // 正确答案个数
    rightAnswerRate:0, // 得分
    timer:null, // 倒计时
    timerText: "00:00:00",// 倒计时文本
    wrongQuestionIds:"", // 错题id集合
    examTime:0, // 考试时间
    scoreEachQuestion:0, // 每题分数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = {};
    if(options.params){
        params = JSON.parse(options.params)
    }
    
    this.setData({
      questionType:params.questionType,
      paperid:params.试卷id?params.试卷id:"",
      chapter:params.章节名称?params.章节名称:"",
      jieid:params.课程id?params.课程id:'',
      className:params.课程班次?params.课程班次:"",
      currQ:params.currQ?parseInt(options.currQ):0,
      scoreEachQuestion:params.scoreEachQuestion?params.scoreEachQuestion:"",
      examTime:params.examTime?params.examTime:""
    });

    if(this.data.questionType=='5'){
      this.getMyQuestionsList({questiontype:'收藏'});
    }else if(this.data.questionType=='6'){
      this.getMyQuestionsList({questiontype:'错题'});
    }else {
      this.getExamList(params);
    }

    // 显示倒计时
    if((this.data.questionType == '2' || this.data.questionType=='4') && this.data.type==0){
      this.timerShow();
    }

    // 定位题目 test
    var  storageData = wx.getStorageSync('pid-' + this.data.paperid + '-z-' + this.data.chapter + '-j-' + this.data.jieid);
    if(this.data.type==0 && storageData.currQ){
      this.setData({
        currQ:storageData.currQ,
        processStorage:storageData.progressList
      })
    }
  },

  // 获取试题列表
  async getExamList(params){
    let _this = this;
    let res = await Server.getExamList(params);
    console.log(res)
    this.doQuestions(res);
  },

  // 获取收藏、错题列表
  async getMyQuestionsList(params){
    this.setData({type:1})
    let res = await Server.getMyQuestions(params)
     this.doQuestions(res);
  },

  // 处理题目列表信息
  doQuestions(res){
    var _this = this;
    let cacheRes=[];
    var myCollectionIds = wx.getStorageSync('myCollectionIds');
    if(res.Result && res.Result.length>0){
      cacheRes = res.Result.map((element,index) => {
        var st = myCollectionIds.indexOf(element.Id)>-1? true:false
        var choosedAnswer = "";
        var choosedText = "";
        if(index<=this.data.processStorage.length){
          choosedAnswer = this.data.processStorage.indexOf(element.Id)>-1?this.data.processStorage[index].chooseAnswer:"";
          choosedText = this.data.processStorage.indexOf(element.Id)>-1?this.data.processStorage[index].choosedText:"";
        }

        return {...element,choosedAnswer:choosedAnswer,choosedText:choosedText,collectionStatus:st}
      });

      _this.setData({
        loading:false,
        totalQuestion:res.TotalCount,
        title:_this.data.chapter? this.data.chapter:(cacheRes[0].Section ||　cacheRes[0].Paper),
        list:cacheRes
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
    if(this.data.list.length<=0){
      return
    }
    if(!this.data.answeredStatus){
      this.staticsRightAnswer();
    }else{
        wx.showToast({
          title: '您已提交过答案了哦~',
          icon: 'success',
          duration: 1000
        })
      }
  },




  // 统计答案
  staticsRightAnswer:function (){
    wx.showLoading({
      title: '答案提交中...',
    })
    let cacheNum  =0;
    let wrongCache = [];
    this.data.list.forEach(element => {
        if(element.Answer==element.choosedAnswer){
            cacheNum +=1;
        }else if(element.choosedAnswer && element.Answer!=element.choosedAnswer){
          wrongCache.push(element.Id)
        }
    });
    this.setData({
      answeredStatus:true,
      showPops:true,
      wrongQuestionIds:wrongCache.join(','),
      rightAnswerNum:cacheNum,
      rightAnswerRate:parseFloat(cacheNum * this.data.scoreEachQuestion),
      type:1
    })
  
    // 添加错题
    if(this.data.wrongQuestionIds.length>0){
      this.addMyQuestions({questiontype:'错题',questionids:this.data.wrongQuestionIds});
    }

    // 保存试卷答题结果
    if(this.data.questionType==2 || this.data.questionType==4){
      this.saveMyExam();
    }else{
      wx.hideLoading();
    }
  },

  // 保存答案数据
  async saveMyExam(){
    let _this = this;
    var params = {paperid:this.data.paperid,score:this.data.rightAnswerRate}
    var res = await Server.saveMyExam(params);
    if(res.Message==null){
      wx.hideLoading();
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1000
      })
    }
  },

  // 查看答题解析、关闭弹窗
  showAnswerDetail: function(e){
    this.popsOnClose();
    if(e.currentTarget.dataset.type==0){ // 查看答题解析
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
      if(this.data.type==1 || this.data.questionType==5 || this.data.questionType==6){
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

  // 发起收藏、取消
  async collectionAction(){
    if(this.data.list.length<=0){
      return
    }
    var ids = this.data.list[this.data.currQ].Id;
    var params = {questiontype:'收藏',questionids:ids};
    if(this.data.list[this.data.currQ].collectionStatus){
      this.removeMyQuestions(params);
    }else{
      this.addMyQuestions(params);
    }
  },

  // 添加收藏或者错题
  async addMyQuestions(params){
    var res = await Server.saveMyQuestions(params);
    if(params.questions=='错题'){
      return
    }
    if(res.Message==null && params.questiontype=='收藏'){
        wx.showToast({
          title:  "收藏成功",
          icon: 'none',
          duration:  500
        })
    
      this.resetListStatus()
      this.resetMyCollectionIds('add',params.questionids)
    }
  },

  // 取消收藏
  async removeMyQuestions(params){
    var res = await Server.removeMyQuestions(params);
    if(res.Message==null){
      wx.showToast({
        title:  "取消成功",
        icon: 'none',
        duration:  500
      })
      this.resetListStatus()
      this.resetMyCollectionIds('delete',params.questionids)
     
    }
  },

  // 更新list中收藏状态
  resetListStatus:function (){
    let _this = this;
    var qq =[];
    qq = _this.data.list.map((element,index)=>{
      if(index == _this.data.currQ){
        return {...element,collectionStatus:!element.collectionStatus}
      }else{
        return element
      }
    })
    this.setData({ list:qq })
  },

  // 更新缓存收藏ids
  resetMyCollectionIds:function(type,id){
    var myCollectionIds = wx.getStorageSync('myCollectionIds') || "";
    var newIds = [];
    if(type=='add' &&  myCollectionIds.indexOf(id)<0){
      newIds = myCollectionIds.length>0?myCollectionIds.split(','):[];
      newIds.push(id);
      wx.setStorageSync('myCollectionIds', newIds.join(','))
    }
    if(type=='delete' &&  myCollectionIds.indexOf(id)>-1){
      myCollectionIds.split(',').forEach(element => {
        if(element!=id){
          newIds.push(element)
        }
      });
      wx.setStorageSync('myCollectionIds', newIds.join(','))
    }
  },


  // 考试倒计时
  timerShow:function (){
    let _this = this;
    var counttime=this.data.examTime * 60;
    _this.setData({
        timer:setInterval(function (){
                if(counttime>=0){
                  var ms = counttime % 60; // 余数 89%60==29秒
                  var mis = Math.floor(counttime/60);//分钟
                  var hour=Math.floor(mis/60);
                  mis=Math.floor((counttime-hour*60*60)/60);
                  
                  _this.setData({timerText: ( (hour < 10?'0':'') +  hour.toString()  + ":" + (mis < 10?'0':'') + mis.toString() + ":" +  (ms < 10?'0':'')  + ms.toString())})
                  counttime--;
                }else{
                    clearInterval(_this.data.timer);
                }
              },1000)
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
    // 保存当前做题记录
    if(this.data.currQ!=0 && !this.data.answeredStatus){
      var progressList = [];
      for(var i = 0;i<this.data.currQ && this.data.currQ<=this.data.list.length;i++){
        progressList.push({
          Id:this.data.list[i].Id,
          choosedAnswer:this.data.list[i].choosedAnswer,
          choosedText:this.data.list[i].choosedText
        })
      }
      debugger
      wx.setStorageSync('pid-' + this.data.paperid + '-z-' + this.data.chapter + '-j-' + this.data.jieid, {progressList:progressList,currQ:this.data.currQ})
    }
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