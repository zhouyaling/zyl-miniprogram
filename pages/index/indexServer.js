import Request from "../../utils/request.js";
export default class {
  // 获取视频栏目
  static getVideoType(params) {
    return Request({
      url: "DataDict/GetList",
      type: "GET",
      data: params,
      // headers: {
      //   "Content-type": "application/json"
      // },
    })
  }
}