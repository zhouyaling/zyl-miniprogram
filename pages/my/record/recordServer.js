import Request from "../../../utils/request.js";
export default class {
  // 获取用户信息
  static getUserInfo(params){
    return Request({
      url: "User/GetUserInfo",
      type: "GET",
      data: params,
    })
  }
}