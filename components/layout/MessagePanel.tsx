import type { PropsWithChildren } from 'react';
import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import ModalPanel from './ModalPanel';

type Props = PropsWithChildren<{
  globalRefName?: string, // 是否是全局组件，全局组件会挂载到router.refs上
  title?: string, // 标题
  width?: number, // 宽度
}>;

export default forwardRef(({
  globalRefName, // 是否是全局组件，全局组件会挂载到router.refs上
  children, // 子组件
  title, // 标题
  width = 320, // 宽度
}: Props, ref) => {
  const modalPanelRef = useRef(null);
  const [option, setOption] = useState({
    title, // 标题
    content: null, // 文本内容
    width, // 宽度
    cancelText: '取消',
    confirmText: '确定',
    onCancel: null, // 取消按钮的回调，可以设置为true
    onConfirm: null, // 确定按钮的回调
  });
  const show = (params?: any) => {
    params?.title && (option.title = params.title);
    params?.content && (option.content = params.content);
    params?.width && (option.width = params.width);
    params?.onCancel && (option.onCancel = params.onCancel);
    params?.cancelText && (option.cancelText = params.cancelText);
    params?.confirmText && (option.confirmText = params.confirmText);
    setOption({ ...option });
    (modalPanelRef.current as any).show();
  }
  const doConfirm = () => {
    if (!option.onConfirm || !(option.onConfirm as any)()) {
      (modalPanelRef.current as any).close();
    }
  }
  const doCancel = () => {
    if (option.onCancel === true || !option.onCancel || !(option.onCancel as any)()) {
      (modalPanelRef.current as any).close();
    }
  }
  useImperativeHandle(ref, () => ({ show, close })); // 暴露函数组件内部方法
  if (globalRefName) {
    router.refs[globalRefName] = { show, close };
  }
  return (
    <ModalPanel ref={modalPanelRef} noTitle position='middle' width={option.width}>
      <View style={_u(`_fx_ccc`)}>
        <View style={_u(`_fx_rcc_1 _mv_40 _w_${option.width * 0.8}`)}>
          {_.isString(option.content) ? <Text>{option.content}</Text> : (option.content || children)}
        </View>
        <Text style={_u(`_s_${option.width}_1_#d3d3d3`)} />
        <View style={_u(`_fx_rc _sm_${option.width}_50`)}>
          {
            !!option.onCancel &&
            <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={doCancel} style={_u(`_fx_rcc_1`)}>
              <Text style={_u(`_fs_15_red`)}>{option.cancelText}</Text>
            </TouchableHighlight>
          }
          {!!option.onCancel && <Text style={_u(`_s_1_50_#d3d3d3`)} />}
          <TouchableHighlight underlayColor='rgba(0, 0, 0, 0)' onPress={doConfirm} style={_u(`_fx_rcc_1`)}>
            <Text style={_u(`_fs_15_#0076FF`)}>{option.confirmText}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ModalPanel>
  );
});
