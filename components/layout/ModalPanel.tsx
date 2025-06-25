import type { PropsWithChildren } from 'react';
import { useState, forwardRef, useImperativeHandle, Children } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { Modal, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = PropsWithChildren<{
  title?: string, // 标题
  width?: number, // 宽度
  height?: number, // 高度
  position?: 'bottom' | 'middle' | 'top', // 位置： bottom|middle|top
  radius?: number, // 曲半径
  noTitle?: boolean, // 不显示标题栏
  noClose?: boolean, // 不显示关闭按钮
}>;

export default forwardRef(({
  children, // 子组件
  title, // 标题
  width = 375, // 宽度
  height = 300, // 高度
  position = 'bottom', // 位置： bottom|middle|top
  radius = 6, // 曲半径
  noTitle = false, // 不显示标题栏
  noClose = false, // 不显示关闭按钮
}: Props, ref) => {
  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState({
    title, // 标题
    width, // 宽度
    height, // 高度
    position, // 位置： bottom|middle|top
    radius, // 曲半径
    noTitle, // 不显示标题栏
    noClose, // 不显示关闭按钮
  });
  const show = (params?: any) => {
    params?.title && (option.title = params.title);
    params?.width && (option.width = params.width);
    params?.height && (option.height = params.height);
    params?.position && (option.position = params.position);
    params?.radius !== undefined && (option.radius = params.radius);
    params?.noTitle !== undefined && (option.noTitle = params.noTitle);
    params?.noClose !== undefined && (option.noClose = params.noClose);
    setVisible(true);
  }
  const close = () => {
    setVisible(false);
  }
  useImperativeHandle(ref, () => ({ show, close })); // 暴露函数组件内部方法

  return (
    <Modal animationType="fade" transparent statusBarTranslucent visible={visible}>
      <View style={_u(`_full _bc_#00000050`, option.position === 'middle' && `_fx_rc`)}>
        {/* 边框 */}
        <View style={_u(`_fx_c _of_hidden _por _p_10 _s_${option.width}_${option.height}_white`, option.position === 'bottom' ? `_pof_b0_l0 _brt_${option.radius}` : option.position === 'top' ? `_poa_t0_l0 _brb_${option.radius}` : `_br_${option.radius}`)}>
          {/* 标题栏 */}
          {
            !option.noTitle &&
            <View style={_u(`_wf_30 _fx_rcc _pb_4 _bob_f8f8f8`)}>
              {/* 标题 */}
              {option.title && <View style={_u(`_fs_14_#a3a3a3_bold`)}>{option.title}</View> || <View></View>}
              {/* 关闭按钮 */}
              {!option.noClose && <View style={_u(`_poa_r10_t0`)}><Icon icon="close-circle-outline" color="#a3a3a3" onPress={close}></Icon></View>}
            </View>
          }
          {/* 内容 */}
          <View style={_u(`_fx_1 _of_y_auto`)}>
            {children}
          </View>
        </View>
      </View>
    </Modal >
  );
});
