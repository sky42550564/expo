import config from '@/config.js';
import { Dimensions, Alert } from 'react-native';
// 常用rn组件
import Div from '@/components/view/Div';
global.Div = Div;

// 常用方法
import _ from './utils/libs/lodash.js';
global._ = _; // 数据处理
import moment from './utils/libs/moment.js';
global.moment = moment; // 时间处理
import * as utils from './utils/index.js';
global.utils = utils;
import uno from './utils/libs/uno.js';
const u = uno(Dimensions.get('window').width);
global._u = u._u; // uno处理css样式
global._us = u._us; // uno处理css样式
import api from './utils/api/index.js';
global.api = api; // 接口定义
import * as CO from './utils/constants/index.js';
global.CO = CO; // 常量定义

// 路由操作
import { useRouter } from 'expo-router';
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


