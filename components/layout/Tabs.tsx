import { Badge } from '@ant-design/react-native';

type Props = {
  tabs?: any,
  valueKey?: any, // 获取的字段，默认为数字下标 ([0,1])，$s: 字符串下标(['0','1'])，$: 直接使用label为值 如: ['汉族', '苗族']：值为：汉族，苗族，'，如果[{ id: 1, name: '汉族' }]，可设置为id
  labelKey?: any, // 显示的字段，默认为数组的一项，如'汉族'，如果[{ id: 1, name: '汉族' }]，可设置为name
  badgeKey?: string,
  activeColor?: any,
  itemWidth?: any, // 每一个tab的宽度
  lineWidth?: any, // 线的长度百分比
  hasBorder?: boolean, // 是否有底部边框
  renders?: any, // 自定义的显示每一个项tab,{renders: { 0: ({ activeColor, lineWidth, label }) => <View></View> }}
  onChange: any, // 变化的回调
  model: any, // 双向绑定
};
export default ({
  tabs,
  valueKey,
  labelKey,
  badgeKey = 'badge',
  activeColor = '#45a3ef',
  itemWidth,
  lineWidth,
  hasBorder,
  renders,
  onChange,
  model,
}: Props) => {
  const getValue = (v: any, k: any) => {
    if (valueKey === '$') {
      return v; // 返回值
    }
    if (valueKey === '$s') {
      return k + ''; // 返回字符串
    }
    if (valueKey) {
      return v && v[valueKey];
    }
    return +k;
  };

  const [state, setState] = useState({ activeColor, activeTabIndex: model ? model[0] : getValue(tabs[0], 0) });

  const changeTab = (value: any, item: any, index: number) => {
    setState((prev: any) => ({ ...prev, activeTabIndex: value }));
    onChange && onChange(value, item, index);
    model?.[1] && model?.[1](value);
  }

  useWatch(() => {
    if (tabs) {
      state.activeTabIndex = getValue(tabs[0], 0);
      setState({...state});
    }
  }, [tabs], false);

  return (
    <Div s='_wf_32 _por'>
      { /*底部边线*/}
      {hasBorder && <Div s='_wf_2_f0f0f0 _poa_t29_l0 _zi_0'></Div>}
      <Div s={itemWidth ? `_fx_r` : `_fx_rc`}>
        {
          _.map(tabs, (v: any, k: any) => (
            <Div key={k} s={['_fx_ccc', itemWidth && `_wm_${itemWidth}`]} onPress={() => changeTab(getValue(v, k), v, k)}>
              {
                renders?.[k] ? renders?.[k]({ activeColor: state.activeColor, lineWidth, label: labelKey ? v[labelKey] : v }) :
                  <Div s='_fx_ccc'>
                    <Div s={[state.activeTabIndex == getValue(v, k) ? `_c_${state.activeColor}` : `_c_gray`, `_fs_14 _mh_10 _mb_10 _nowrap`]}>
                      {labelKey ? v[labelKey] : v}
                      {v[badgeKey] && <Badge text={v[badgeKey]} dot={v[badgeKey] === true} style={_u(`_poa_l0_t-10`)}></Badge>}
                    </Div>
                    <Div s={[`_zi_2 _w_${lineWidth} _h_2`, state.activeTabIndex == getValue(v, k) && `_bc_${state.activeColor}`]}></Div>
                  </Div>
              }
            </Div>
          ))}
      </Div>
    </Div>
  )
}
