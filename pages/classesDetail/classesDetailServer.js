
import Request from "../../utils/request.js";
export default class {
  // 增加阅读次数
  static saveViewTimes(params) {
    return Request({
      url: "Course/SaveViewTimes",
      type: "POST",
      data: params,
      // headers: {
      //   "Content-type": "application/json"
      // },
    })
  }
}