import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');

// 消息类型样式映射
type ToastType = 'success' | 'error' | 'warning' | 'info';

const TYPE_STYLES: Record<ToastType, { backgroundColor: string; icon: string }> = {
  success: { backgroundColor: '#52c41a', icon: '✅' },
  error: { backgroundColor: '#ff4d4f', icon: '❌' },
  warning: { backgroundColor: '#faad14', icon: '⚠️' },
  info: { backgroundColor: '#1890ff', icon: 'ℹ️' }
};

type Props = {
  globalRefName?: string, // 是否是全局组件，全局组件会挂载到router.refs上
  message?: string, // 消息内容
  type?: ToastType, // 类型
  duration?: number, // 显示时长
  onClose?: any, // 关闭的回调
};
export default forwardRef(({
  globalRefName, // 是否是全局组件，全局组件会挂载到router.refs上
  message, // 标题
  type = 'info', // 类型
  duration = 3000, // 显示时长
  onClose, // 关闭的回调
}: Props, ref) => {
  const [visible, setVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;
  // 动画控制
  const fadeIn = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start();
  };

  const fadeOut = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(onClose);
  };

  const show = () => {
    setVisible(true);
    fadeIn();
    setTimeout(fadeOut, duration);
  }

  const { backgroundColor, icon } = TYPE_STYLES[type];

  useImperativeHandle(ref, () => ({ show })); // 暴露函数组件内部方法
  if (globalRefName) {
    router.refs[globalRefName] = { show };
  }

  return (
    visible &&
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }], backgroundColor }]} >
      <Text style={styles.message}>{`${icon} ${message}`}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 20,
    maxWidth: width * 0.8
  },
  message: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  }
});
