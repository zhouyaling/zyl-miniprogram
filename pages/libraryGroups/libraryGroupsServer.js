import Request from "../../utils/request.js";
export default class {
   // 查询章节列表，根据班级id查询
   static getZhangList(params){
    return Request({
      url: "Course/GetZhangList",
      type: "GET",
      data: params,
      // headers: {
      //   "Content-type": "application/json"
      // },
    })
  }

  // 查列表，根据章节id查询
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

  // 查询试卷列表
  static getPaperList(params){
    return Request({
      url: "Exam/GetPaperList",
      type: "GET",
      data: params,
      // headers: {
      //   "Content-type": "application/json"
      // },
    })
  }
}