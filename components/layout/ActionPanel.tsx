import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Modal, View, Text, TouchableHighlight, Animated } from 'react-native';

type Props = {
  globalRefName?: string, // 是否是全局组件，全局组件会挂载到router.refs上
  title?: string, // 标题
  buttons?: any, // 按钮
  width?: number, // 宽度
  radius?: number, // 弧度
};

export default forwardRef(({
  globalRefName, // 是否是全局组件，全局组件会挂载到router.refs上
  title, // 标题
  buttons = [], // 按钮
  width = 375, // 宽度
  radius = 6, // 弧度
}: Props, ref) => {
  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState({
    title, // 标题
    buttons, // 按钮, 格式 [{ label: '确定', callback: ()=>{}, color: 'red' }]
    cancelText: '取消',
    onCancel: true, // 取消按钮的回调，可以设置为true
  });
  const animation = useRef(new Animated.Value(0)).current;

  const slideUp = () => { // 向上动画
    Animated.parallel([
      Animated.timing(animation, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  };

  const slideDown = () => { // 向下动画
    Animated.parallel([
      Animated.timing(animation, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => {
      setVisible(false);
    });
  };

  // 计算 translateY
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [sr.h, 0]
  });

  const show = (params?: any) => {
    params?.title && (option.title = params.title);
    params?.buttons && (option.buttons = params.buttons);
    params?.onCancel && (option.onCancel = params.onCancel);
    params?.cancelText && (option.cancelText = params.cancelText);
    setOption({ ...option });
    setVisible(true);
    slideUp();
  }
  const close = () => {
    setVisible(false);
  }
  const doConfirm = (o: any) => {
    if (!o.callback || !(o.callback as any)()) {
      slideDown();
    }
  }
  const doCancel = () => {
    if (option.onCancel === true || !option.onCancel || !(option.onCancel as any)()) {
      slideDown();
    }
  }
  useImperativeHandle(ref, () => ({ show, close })); // 暴露函数组件内部方法
  if (globalRefName) {
    router.refs[globalRefName] = { show, close };
  }
  return (
    <Modal animationType="fade" transparent statusBarTranslucent visible={visible}>
      <View style={_u(`_full _bc_#00000050`)}>
        {/* 边框 */}
        <Animated.View style={_u(`_fx_c _of_hidden _por _p_10 _w_${width} _bc_white _pof_b0_l0 _brt_${radius}`, { transform: [{ translateY }] })}>
          <View style={_u(`_fx_ccc`)}>
            {
              buttons.map((o: any, k: number) => (
                <TouchableHighlight key={k} underlayColor='rgba(0, 0, 0, 0)' onPress={() => doConfirm(o)} style={_u(`_fx_rc_1 _sm_${width * 0.9}_40 _bob_#e3e3e3`)}>
                  <Text style={_u(`_fs_15_${o.color || '#0076FF'}`)}>{o.label}</Text>
                </TouchableHighlight>
              ))
            }
            {
              !!option.onCancel &&
              <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={doCancel} style={_u(`_fx_rc_1 _hm_50`)}>
                <Text style={_u(`_fs_15_red`)}>{option.cancelText}</Text>
              </TouchableHighlight>
            }
          </View>
        </Animated.View>
      </View>
    </Modal >
  );
});
