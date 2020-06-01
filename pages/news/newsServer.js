import Request from "../../utils/request.js";
export default class {
  // 获取新闻栏目
  static getNewsType(params) {
    return Request({
      url: "DataDict/GetList",
      type: "GET",
      data: params,
      // headers: {
      //   "Content-type": "application/json"
      // },
    })
  }

  // 获取新闻列表
  static getNewsList(params){
    return Request({
      url: "News/GetPageList",
      type: "GET",
      data: params,
      // headers: {
      //   "Content-type": "application/json"
      // },
    })
  }
}