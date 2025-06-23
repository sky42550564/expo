import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import * as utils from './index';
import uno from './uno';
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
global.utils = utils;
global._u = uno; // uno处理css样式
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


