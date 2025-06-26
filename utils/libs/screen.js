import { Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');

export default {
  setting: {}, // 配置
  w: window.width, // 窗口的宽度
  h: window.height, // 窗口的高度(去除标题栏和状态栏64)
  fh: window.height, // 窗口总高度 （fh = h+ top ）
  pr: window.scale, // 像素比
  os: Platform.OS, // 所在操作系统
  platform: Platform.OS === 'web' ? 'h5' : 'app', // 所在平台
  h5: Platform.OS === 'web', // 指定是否是H5
  app: Platform.OS !== 'web', // 指定是否是移动应用
}
