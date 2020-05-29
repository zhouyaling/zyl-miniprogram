// 基础共同的配置
let baseConfig = {
  // auth名，登陆后得到的令牌缓存的名字
  token:'token',
  authName: 'authName',
  jsCodeKey: 'jsCodeName',
  phoneNoKey: 'phoneNo',
  sessionKey: 'wxSession',
  openIdKey: 'openId',
  //推荐人id
  referrerIdKey: 'referrerId',
  userInfoKey: 'userInfo',
  // 登录后存放的用户信息的名字
  userIdKey: 'userId',
  // 环境变量，loc, dev，sit,uat,prod
  ENV: 'prod',
  version: '1.0.0',
  //密码控件地址
  pwdCtrlH5Url: 'h5/pwd/index.html',
  //资讯详情H5页面
  newsDetailUrl: 'h5/newsDetail/index.html',
  //锦鲤H5页面
  fishH5Url:'https://hd.hdapis.com/mdzyjl/index.html',
  //密码因子过期时间(单位：分钟)
  pwdRandomTimeout: 9,
  // headers所存放的常量
  headers: {
  },
}

// 根据不同环境变量，不同的配置
let envConfig = {
  loc: {
    // api接口主机地址
    host:
    'https://app-zmzj-test.mideazy.com/',//test
    // host: 'https://appzmzjsit.midea.com/',//sit
    // host: 'https://app-zmzj.mideazy.com/',//prod
    ossHost: 'https://zmzj-test.oss-cn-shenzhen.aliyuncs.com/mideadc-miniprogram/',
    // 只能在本地生效
    IntergralH5Url: 'https://jfsc-sit.mideazy.com', 
    mock: false,
  }, 
  dev: {
    // api接口主机地址，演示阶段，先用本地，且开启mock
    host: 'https://wyzs-app-dev.mideazy.com/',
    // host: 'http://wyzs-app-dev.mideazy.com/',
    ossHost: 'https://zmzj-dev.oss-cn-shenzhen.aliyuncs.com/mideadc-miniprogram/',
    // 只能在本地生效
    IntergralH5Url: 'https://jfsc-sit.mideazy.com',
    mock: false,
  },
  sit: {
    // api接口主机地址，演示阶段，先用本地，且开启mock
    host: 'https://app-zmzj-sit.mideazy.com/',
    ossHost: 'https://zmzj-sit.oss-cn-shenzhen.aliyuncs.com/mideadc-miniprogram/',
    // 只能在本地生效
    IntergralH5Url: 'https://jfsc-sit.mideazy.com',
    mock: false,
  },
  uat: {
    // api接口主机地址，演示阶段，先用本地，且开启mock
    host:'https://wyzs-app-uat.mideazy.com/', 
    ossHost: 'https://zmzj-pro.oss-cn-shenzhen.aliyuncs.com/mideadc-miniprogram/',
    // 只能在本地生效
    IntergralH5Url: 'https://jfsc-sit.mideazy.com',
    mock: false,
  },
  prod: {
    // api接口主机地址，演示阶段，先用本地，且开启mock
    //https://rend-sale-test.tq-service.com/app/ 
    // http://118.190.217.38/ys_jhjy/
    host: 'http://feidie.tech:5001/',
    ossHost: 'https://zmzj-pro.oss-cn-shenzhen.aliyuncs.com/mideadc-miniprogram/',
    IntergralH5Url: 'https://jfsc.mideazy.com',
    // 只能在本地生效
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
  // 本机开发环境，则当前assets/mock下面的json
  if (config.mock && (config.ENV == 'loc' || config.ENV === 'dev')) {
    console.log(document)
    return "https://zmzj-pro.oss-cn-shenzhen.aliyuncs.com" + "/mideadc-miniprogram/mock/" + url.replace(/\//g, "-") + '.json'

    // 其它环境，则读取真实应用的接口
  } else {
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
}

// 拼接接口所需域名和服务名，只需要输入接口名即可  如 yundt/mgmt/item/list-by-page，也不要加斜杆开始，
// 如果接口以http开头，则不会进拼接，而是保留原样
// 如果是mock，则会去assets/mock请求同名json，但/会被替换为-   如  yundt-mgmt-item-list-by-page.js
config.apiAppName = getApiAppName
//密码控件地址
config.pwdCtrlH5Url = config.host + config.pwdCtrlH5Url;
export default config
