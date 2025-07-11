import type { PropsWithChildren } from 'react';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'react-native';

type Props = PropsWithChildren<{
  globalRefName?: string, // 是否是全局组件，全局组件会挂载到router.refs上
  title?: string, // 标题
  width?: number, // 宽度
  height?: number, // 高度
  position?: 'bottom' | 'middle' | 'top', // 位置： bottom|middle|top
  radius?: number, // 曲半径
  noTitle?: boolean, // 不显示标题栏
  noClose?: boolean, // 不显示关闭按钮
}>;

export default forwardRef(({
  globalRefName, // 是否是全局组件，全局组件会挂载到router.refs上
  children, // 子组件
  title, // 标题
  width = 375, // 宽度
  height, // 高度
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
    content: null, // 如果没有children显示的内容
  });
  const show = (params?: any) => {
    params?.title && (option.title = params.title);
    params?.width && (option.width = params.width);
    params?.height && (option.height = params.height);
    params?.position && (option.position = params.position);
    params?.radius !== undefined && (option.radius = params.radius);
    params?.noTitle !== undefined && (option.noTitle = params.noTitle);
    params?.noClose !== undefined && (option.noClose = params.noClose);
    params?.content && (option.content = params.content);
    setOption({ ...option });
    setVisible(true);
  }
  const close = () => {
    setVisible(false);
  }
  useImperativeHandle(ref, () => ({ show, close })); // 暴露函数组件内部方法
  if (globalRefName) {
    router.refs[globalRefName] = { show, close };
  }
  return (
    <Modal animationType="fade" transparent statusBarTranslucent visible={visible}>
      <Div s={[`_full _bc_#00000050`, option.position === 'middle' && `_fx_rc`]}>
        {/* 边框 */}
        <Div s={[`_fx_c _of_hidden _por _w_${option.width} _bc_white`, option.height && `_h_${option.height}`, option.position === 'bottom' ? `_poa_b0_l0 _brt_${option.radius}` : option.position === 'top' ? `_poa_t0_l0 _brb_${option.radius}` : `_br_${option.radius}`]}>
          {/* 标题栏 */}
          {
            !option.noTitle &&
            <Div s='_wf_40 _fx_rc _bob_f8f8f8 _por'>
              {/* 标题 */}
              {option.title && <Div s='_fs_14_#a3a3a3_bold'>{option.title}</Div> || <Div></Div>}
              {/* 关闭按钮 */}
              {!option.noClose && <Icon s='_poa_r10' icon="close-circle-outline" size={18} color="#d3d3d3" onPress={close}></Icon>}
            </Div>
          }
          {/* 内容 */}
          <Div s='_fx_rc_1 _of_y_auto'>
            {option.content || children}
          </Div>
        </Div>
      </Div>
    </Modal>
  );
});
