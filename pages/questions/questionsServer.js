import Request from "../../utils/request.js";
export default class {
   // 查询试题列表
   static getExamList(params){
    return Request({
      url: "Exam/GetExamList",
      type: "GET",
      data: params,
    })
  }

  // 查询视频列表，根据章节id查询
  static getPageList(params){
    return Request({
      url: "Course/GetPageList",
      type: "GET",
      data: params,
      // headers: {
      //   "Content-type": "application/json"
      // },
    })
  }

  // 添加收藏
  static saveMyQuestions(params){
    return Request({
      url:"Exam/SaveMyQuestions",
      type:"POST",
      data:params,
    })
  }

    // 取消收藏
    static removeMyQuestions(params){
      return Request({
        url:"Exam/RemoveMyQuestions",
        type:"POST",
        data:params,
      })
    }

      // 获取我的收藏列表
    static getMyQuestions(params){
      return Request({
        url: "Exam/GetMyQuestions",
        type: "GET",
        data: params,
      })
    }

    // 获取我的收藏列表
    static saveMyExam(params){
      return Request({
        url: "Exam/SaveMyExam",
        type: "POST",
        data: params,
      })
    }
}