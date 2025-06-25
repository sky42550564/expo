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
  noTitle?: boolean, // 不显示标题栏
  radius?: number, // 曲半径
}>;

export default forwardRef(({
  children, // 子组件
  title = '提示', // 标题
  width, // 宽度
  height, // 高度
  position, // 位置： bottom|middle|top
  noTitle, // 不显示标题栏
  radius, // 曲半径
}: Props, ref) => {
  const [visible, setVisible] = useState(false);
  const show = (options?: any) => {
    options?.title && (title = options.title);
    options?.width && (width = options.width);
    options?.height && (height = options.height);
    options?.position && (position = options.position);
    options?.noTitle !== undefined && (noTitle = options.noTitle);
    options?.radius !== undefined && (radius = options.radius);
    setVisible(true);
  }
  const close = () => {
    setVisible(false);
  }

  useImperativeHandle(ref, () => ({ show, close })); // 暴露函数组件内部方法
  return (
    <Modal animationType="fade" transparent statusBarTranslucent visible={visible}>
      <View style={_u(`_full _bc_#00000050`, position === 'middle' && `_fx_rc`)}>
        {/* 边框 */}
        <View style={_u(`_fx_c _of_hidden _por _p_10 _s_${width}_${height}_white`, position === 'bottom' ? `_pof_b0_l0 _brt_${radius}` : position === 'top' ? `_poa_t0_l0 _brb_${radius}` : `_br_${radius}`)}>
          {/* 标题栏*/}
          {
            !noTitle &&
            <View style={_u(`_wf_30 _fx_rcc _pb_4 _bob_f8f8f8`)}>
              {title && <View style={_u(`_fs_14_bold`)}>{title}</View> || <View></View>}
              <View style={_u(`_poa_r10_t0`)}>
                <Icon icon="close-circle-outline"></Icon>
              </View>
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
