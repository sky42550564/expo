import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Text, Animated } from 'react-native';

type Props = {
  globalRefName?: string, // 是否是全局组件，全局组件会挂载到router.refs上
};
export default forwardRef(({
  globalRefName, // 是否是全局组件，全局组件会挂载到router.refs上
}: Props, ref) => {
  const DEFAULT_OPTION = {
    color: 'white', // 字体颜色
    backgroundColor: '#2bdc70', // 背景色
    duration: 3000, // 显示时长
    message: '', // 显示的消息
    onClose: null, // 关闭的回调函数
  };
  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState(DEFAULT_OPTION);
  // 动画控制
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-50)).current;
  const fadeIn = () => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0.8, duration: 500, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 10, duration: 500, useNativeDriver: true })
    ]).start();
  };
  const fadeOut = () => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: -50, duration: 200, useNativeDriver: true })
    ]).start(typeof option.onClose === 'function' ? option.onClose : undefined);
  };
  const show = (params: any) => {
    setOption({ ...DEFAULT_OPTION, ...params });
    setVisible(true);
    fadeIn();
    setTimeout(fadeOut, option.duration);
  }

  useImperativeHandle(ref, () => ({ show })); // 暴露函数组件内部方法
  if (globalRefName) {
    router.refs[globalRefName] = { show };
  }

  return (
    visible &&
    <Animated.View style={[_u(`_wf _poa_t0_l0 _fx_rc`), { opacity, transform: [{ translateY }] }]} >
      <Text style={_u(`_fs_14_${option.color}_tc _bc_${option.backgroundColor} _p_6_20 _br_4`)}>{option.message}</Text>
    </Animated.View>
  );
});
