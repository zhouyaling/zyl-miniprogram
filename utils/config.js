// 基础共同的配置
let baseConfig = {
  authToken: 'authToken',
  jsCodeKey: 'jsCodeName',
  userClasses: 'userClasses', // 授权的班级id集合
  phoneNoKey: 'phoneNo',
  wxMobile:'wxMobile', 
  ENV: 'prod',
  version: '1.0.0',
  headers: {
  },
}

// 根据不同环境变量，不同的配置
let envConfig = {
  dev: {
    host: 'https://feidie.tech/ys_jhjy_api/',
    mock: false,
  },
  prod: {
    host:'https://jhjy.jiahujiaoyu.cn/ys_jhjy_api3/',  //  https://jhjy.jiahujiaoyu.cn/ys_jhjy_api/
    mock: false,
  },
}

// 合并配置
let config = Object.assign(baseConfig, envConfig[baseConfig.ENV])
/**
 * 获得api接口地址
 * @param  {String} url    接口地址
 * @param  {Object} config 基础配置信息
 * @return {String}        转换过的接口地址
 */
const getApiAppName = function (url) {
  if (!url) {
    return
  } else if (url.indexOf("http") >= 0) {
    return url
  }

  let str = ""
  // url到应用的映射
  let apiAppName = {
    "smartsales/trade": "smartsales-trade-application",
    "smartsales/mgmt": "smartsales-mgmt-application",
    "yundt/mgmt": "yundt-application-mgmt"
  }
  for (let key in apiAppName) {
    if (url.indexOf(key) >= 0) {
      str = apiAppName[key]
    }
  }
  let version = 'api/v1'
  return `${config.host}${url}`
}

// 拼接接口所需域名和服务名，只需要输入接口名即可  如 yundt/mgmt/item/list-by-page，也不要加斜杆开始，
// 如果接口以http开头，则不会进拼接，而是保留原样
// 如果是mock，则会去assets/mock请求同名json，但/会被替换为-   如  yundt-mgmt-item-list-by-page.js
config.apiAppName = getApiAppName
export default config
