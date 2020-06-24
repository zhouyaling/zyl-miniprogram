import Request from '../../../utils/request.js'
export default class {
  // 获取我的收藏
  static getMyQuestions(params){
    return Request({
      url: "Exam/GetMyQuestions",
      type: "GET",
      data: params,
    })
  }
}