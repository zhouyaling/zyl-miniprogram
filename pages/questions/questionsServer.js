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
}