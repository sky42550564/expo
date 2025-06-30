import { useRouter } from 'expo-router';
const expoRouter = useRouter();

export default {
  title: null, // 标题
  headerLeft: null, // 导航栏左边
  headerRight: null, // 导航栏右边
  url: null, // 路由的url
  passProps: {}, // 传递的页面参数
  refs: {}, // 用来保存全局的组件的ref
  api: {}, // 全局的方法
  push(url, params) {
    console.log('router:', url, params);
    const { title, headerLeft, headerRight, ...passProps } = params || {};
    this.title = title;
    this.headerLeft = headerLeft;
    this.headerRight = headerRight;
    this.url = url;
    this.passProps = passProps;
    return new Promise(resolve => {
      expoRouter.push(url);
      resolve();
    });
  },
  back() {
    expoRouter.back();
  },
}
