import Request from '../../../utils/request.js'
export default class {
  // 获取我的课程
  static getMyClassList(params){
    return Request({
      url: "Course/GetMyClassList",
      data: params,
      type: "GET",
    })
  }
}