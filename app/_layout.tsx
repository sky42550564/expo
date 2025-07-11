import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import '../global'; // 注册全局变量
import { store } from '../store';
import { Provider as AntdProvider } from '@ant-design/react-native';
import MessagePanel from '@/components/layout/MessagePanel';
import ToastPanel from '@/components/layout/ToastPanel';
import ModalPanel from '@/components/layout/ModalPanel';
import CustomHeader from '@/components/navigate/CustomHeader';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
    antfill: require('@ant-design/icons-react-native/fonts/antfill.ttf'),
  });


  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <AntdProvider>
        <Provider store={store}>
          <Stack
            screenOptions={{
              // header: (props) => <CustomHeader {...props} />, // 自定义导航
              // 全局导航栏样式
              headerStyle: {
                backgroundColor: '#2D8CF0', // 背景色
              },
              headerTintColor: '#fff', // 文字和图标的颜色
              headerTitleStyle: {
                fontWeight: 'bold', // 标题字体粗细
              },
              headerTitleAlign: 'center', // 标题对齐方式
            }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="pages/personal/index" options={{ title: '个人中心' }} />
          </Stack>
          <StatusBar style="auto" />
          <MessagePanel globalRefName="message"></MessagePanel>
          <ToastPanel globalRefName="toast"></ToastPanel>
          <ModalPanel globalRefName="modal"></ModalPanel>
        </Provider>
      </AntdProvider>
    </ThemeProvider>
  );
}
