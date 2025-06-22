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
}

