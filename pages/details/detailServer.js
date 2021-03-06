import Request from "../../utils/request.js";
export default class {
  // 获取文章详情
  static getNewForm(params) {
    return Request({
      url: "News/GetForm",
      type: "GET",
      data: params,
      // headers: {
      //   "Content-type": "application/json"
      // },
    })
  }

  // 增加阅读次数
  static saveViewTimes(params) {
    return Request({
      url: "News/SaveViewTimes",
      type: "POST",
      data: params,
      // headers: {
      //   "Content-type": "application/json"
      // },
    })
  }
}