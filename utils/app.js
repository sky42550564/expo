import config from '@/config.js';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import * as utils from './index.js';
global.utils = utils;
import uno from './uno.js';
global._u = uno; // uno处理css样式
import _ from './libs/lodash.js';
global._ = _; // 数据处理
import moment from './libs/moment.js';
global.moment = moment; // 时间处理
import api from './api/index.js';
global.api = api; // 接口定义
const expoRouter = useRouter();
global.router = {
  url: null, // 路由的url
  passProps: {}, // 传递的页面参数
  push(url, passProps) {
    console.log('router:', url, passProps);
    this.isActive = true;
    this.url = url;
    this.passProps = passProps || {};
    return new Promise(resolve => {
      expoRouter.push(url);
      resolve();
    });
  },
  back() {
    expoRouter.back();
  },
};
// 交互
global.$alert = (msg) => { // 提示信息
  return new Promise(resolve => {
    Alert.alert('', msg);
  });
}
global.$success = (msg) => { // 显示成功的消息
  return new Promise(resolve => {
    Alert.alert('', msg);
  });
}
// 图片路径
// 获取静态文件的地址，protocal/user.html -> http://localhost:5188/protocal/user.html
global._url = (url) => {
  return !url || /^http/.test(url) ? url : `${config.server}/${url.replace(/^\//, '')}`;
}
// 获取image的地址，1.png -> http://localhost:5188/img/app/1.png
global._img = (url) => {
  return !url || /^http/.test(url) ? url : `${config.server}/img/${config.project}/${url.replace(/^\//, '')}`;
}
// 获取common的image的地址，1.png -> http://localhost:5188/img/app/1.png
global._imgc = (url) => {
  return !url || /^http/.test(url) ? url : `${config.server}/img/common/${url.replace(/^\//, '')}`;
}


