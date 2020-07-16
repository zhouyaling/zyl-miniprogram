import Request from "../../utils/request.js";
export default class {
  // 获栏目
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

   // 获取轮播图
   static getBannerList(params){
    return Request({
      url: "Banner/GetList",
      type: "GET",
      data: params,
      // headers: {
      //   "Content-type": "application/json"
      // },
    })
  }

   // 查询班次列表，根据课程专题查询的
   static getClassList(params){
    return Request({
      url: "Course/GetClassList",
      type: "GET",
      data: params,
      // headers: {
      //   "Content-type": "application/json"
      // },
    })
  }
}