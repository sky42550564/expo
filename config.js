let test = false;
test = true; // 是否是测试环境
const domain = 'http://localhost:5188';
const qrcode = `${domain}/weixinQRCode`; // 小程序的普通二维码访问地址，在微信小程序后台设置扫普

const setting = test ? {
  // server: 'http://localhost:5188',  // 服务器
  server: 'http://192.168.45.124:5188', // 通过代理服务
  // server: 'https://somiit.com', // 接口服务器地址
  testPath: '/pages/test/index', // 不需要登录跳转到某一个页面
  // homePath: '/pages/test/index', // 登录成功后跳转的页面，不设置跳转到 /pages/square/index
  // platform: 'wxapp', // 指定平台
  os: 'android', // 指定操作系统
  login: { // 模拟登录参数
    // params: { q: `${qrcode}?t=0&i=663a405d1a1f216c07f58222` }, // 扫描二维码登录的情况
    // params: { q: `${qrcode}?t=1&i=67238066ee374a3ad7ab8368` }, // 扫描二维码邀请的情况
    // params: { scene: `t=1&i=67120d4c321ecc0f92446e05` }, // 小程序二维码邀请的情况
    // params: { t: 1, i: '663a405d1a1f216c07f58222' }, // 点击分享页面邀请的情况
    // params: { scene: `t=2&i=67c9081cd1c6c8136593b83e` }, // 小程序二维码邀请加入公司的情况，i为shop的id
    // params: { q: `${qrcode}?t=3&i=67d2a1e7e840b41d807bc53a` }, // 扫描二维码进入群聊的情况
  },
  personal: { // 测试的时候，通过在这里设置个人信息调试权限等
    // #ifdef H5
    // code: '__wxTest' + '001', // 模拟的微信openId以 __wxTest 开头，如果多用户测试的时候，在url中设置code或者userId经行测试，这是需要注释掉这里的code和userId，如：http://localhost:5000/h5/?code=__wxTest002
    // phone: '13012341301', // 使用phone进行登录
    // holderId: '669a334aed0842368a49756d', // 店铺老板的id
    // type: 'superAdmin', // 是否是管理员
    // money: 10000, // 余额
    // sourceVipLevel: 1, // 资源会员等级, 1: 3个月会员199 2: 一年299 3：终生会员899
    // sourceVipEndTime: '2024-11-04 12:07:50', // 资源会员到期时间
    // registerTime: '2024-11-04 12:07:50', // 注册时间
    // vipLevel: 1, // 会员等级, 1: 普通会员 2: 黄金会员（半年） 3：铂金会员（全年）
    // vipEndTime: '2024-04-12', // VIP到期时间
    // isFrozen: false, // 是否被冻结
    // authority: [1, 2, 3, 4], // 权限
    // #endif
    // #ifndef H5
    // code: '__wxTest' + '001',
    // #endif
  },
  kkFileViewServer: 'http://localhost:5188',  // 预览文件kkFileView的服务器地址
  noNotifyLog: true, // 不显示通知日志，开发的时候影响查看日志
} : {
  server: domain, // 接口服务器地址
  kkFileViewServer: 'https://somiit.com',  // 预览文件kkFileView的服务器地址
};
export const serverSetting = { // 获取的服务器配置项
  serverAddress: '', // 服务器地址
  superAdminId: null, // 超管
  modifiedMobileMenus: [], // 移动端菜单的修改列表
  logo: '', // 网站logo
  wxappLogo: '', // 微信小程序的logo图片，如果不设置直接使用LOGO
  wxappName: '', // 微信小程序名称
  hasWeixinAppPay: false, // 是否开启微信小程序支付
  hasWeixinMobilePay: false, // 是否开启微信App支付
  hasAliMobilePay: false, // 是否开启微信App支付
  inviteLevel: 0, // 分销等级
  kefuPhone: '18880080880', // 客户电话
  uploadType: 0, // 上传文件存储类型
  QINIU_ZONE: '华南', // 七牛云的zone
  QINIU_IMAGE_URL: 'http://jiakaoyun.qiniu.gzlhkj.vip', // 七牛云上传的图片的url
  clientPropList: [], // 用户的属性列表
  commonMessageList: [], // 聊天常用语列表
  flashedTimeLong: 10, // 阅后即焚的时长
  placeOrderDelayTime: 10, // 咨询服务间隔时间单位为分钟
  busyTimeStep: 10, // 咨询服务设置的时间间隔单位为分钟
  topicTag: [], // 话题标签
  rongyunChatOn: false, // 是否开启融云聊天
  rongyunVirtualSocket: false, // 融云聊天走服务器模式，通过服务器使用融云的聊天模拟socket
  RONGYUN_APP_KEY: '', // 融云聊天APPKEY
  // 发布设置
  testMode: false, // 是否是展览模式
  // 版本管理
  iosVersion: '1.0.0', // ios的版本号
  iosIsWgtPackage: 1, // ios是否是热更新包
  iosDescription: '发布初始版本', // ios版本更新描述
  iosPackageUrl: '', // android更新包文件地址
  androidVersion: '1.0.0', // android的版本号
  androidIsWgtPackage: 1, // android是否是热更新包
  androidPackageUrl: '', // android更新包文件地址
  androidDescription: '发布初始版本', // android版本更新描述
};
export default {
  project: 'app', // 工程名称
  test, // 是否是测试环境
  needLoginFirst: 1, // 是否登录后才能进入首页
  qrcode, // 小程序的普通二维码访问地址，在微信小程序后台设置扫普通链接二维码打开小程序
  kkFileViewServer: setting.kkFileViewServer, // 预览文件kkFileView的服务器地址
  testPath: setting.testPath,  // 登录成功后跳转的页面，不设置跳转到 /pages/chat/chat/index
  homePath: setting.homePath,  // 登录成功后跳转的页面，不设置跳转到 /pages/chat/chat/index
  login: setting.login,// 不需要登录跳转到某一个页面
  personal: setting.personal, // 测试的时候，通过在这里设置个人信息调试权限等
  platform: setting.platform, // 指定平台
  os: setting.os, // 指定操作系统
  gaodeKey: '4111037ceebbbd85d95f36bd271b5817', // 高德地图的key
  noNotifyLog: setting.noNotifyLog,
  server: setting.server, // 服务器地址
  language: 'cn', // 语言
}
