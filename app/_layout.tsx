import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import '../global'; // 注册全局变量
import { store } from '../store';
import MessagePanel from '@/components/layout/MessagePanel';
import ToastPanel from '@/components/layout/ToastPanel';
import CustomHeader from '@/components/navigate/CustomHeader';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="pages/personal/index" options={{}} />
        </Stack>
        <StatusBar style="auto" />
        <MessagePanel globalRefName="message"></MessagePanel>
        <ToastPanel globalRefName="toast"></ToastPanel>
      </Provider>
    </ThemeProvider>
  );
}
