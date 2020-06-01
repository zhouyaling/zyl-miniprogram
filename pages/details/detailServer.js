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
}