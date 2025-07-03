import { forwardRef, useImperativeHandle } from 'react';
import { ScrollView, Modal } from 'react-native';

type Props = {
  initValue: any, // 初始值
  anySelect: boolean, // 是否能任意选择
  leafLevels: any, // 叶子节点的lebel
  onSelect: any, // 选择的回调
};

export default forwardRef((props: Props, ref) => {
  const [state, setState] = useState({
    visible: false,
    list: [],
    activeIndex: 0,
    addressList: [],
    selectItem: null,
  });

  const showList = useComputed(() => state.list[state.activeIndex] || [], [state]);
  const showAddressList = useComputed(() => _.get(_.last(state.addressList), 'isLeaf') ? state.addressList : [...state.addressList, { name: '请选择' }], [state]);
  const activeCode = useComputed(() => _.get(state.addressList[state.activeIndex], 'code'), [state]);

  const getList = async (parentCode = '0') => {
    const params = { pageSize: 1000, parentCode };
    const data = await utils.post(`/list/tb_region`, params);
    if (data.success) {
      return data.result.list.map((o: any) => ({ name: o.name, isLeaf: props.leafLevels.includes(o.level), code: o.code }));
    }
    return null;
  }
  const getInitList = async () => {
    const { initValue } = props;
    let parentCode = '0';
    if (initValue?.length) {
      for (const name of initValue) {
        const list = await getList(parentCode);
        const item = _.find(list, (o: any) => o.name === name);
        if (item) {
          parentCode = item.code;
          state.list.push(list);
          state.addressList.push(item);
        }
      }
      state.activeIndex = state.addressList.length - 1;
      setState({ ...state });
    }
  }

  const onAddressClick = (item: any, i: any) => {
    state.activeIndex = i;
    setState({ ...state });
  }

  const onNodeClick = async (item: any) => {
    if (state.addressList.length > state.activeIndex) {
      state.addressList = state.addressList.slice(0, state.activeIndex);
      state.list = state.list.slice(0, state.activeIndex + 1);
    }
    state.selectItem = null;
    if (item.isLeaf) {
      if (props.anySelect) {
        state.selectItem = item;
      } else {
        state.addressList.push(item);
        props.onSelect(state.addressList);
        state.visible = false;
      }
    } else {
      const list = await getList(item.code);
      list && state.list.push(list);
      state.addressList.push(item);
      state.activeIndex++;
    }
    setState({ ...state });
  }

  const onNodeSelect = async (item: any) => {
    state.selectItem = item;
    setState({ ...state });
  }

  const selectAddress = () => {
    props.onSelect([...state.addressList, state.selectItem]);
    state.visible = false;
    setState({ ...state });
  }

  const show = async () => {
    state.visible = true;
    if (!state.list?.length) { // 如果没有拉去过初始数据
      if (!props.initValue) {
        const list = await getList('0');
        list && state.list.push(list);
      } else {
        getInitList();
      }
    }
    setState({ ...state });
  }

  const close = () => {
    state.visible = false;
    setState({ ...state });
  }

  useImperativeHandle(ref, () => ({ show, close })); // 暴露函数组件内部方法

  return (
    <Modal animationType="fade" transparent statusBarTranslucent visible={state.visible}>
      <Div s='_full _bc_#00000050'>
        <Div s='_wf_400_white _brt_10 _fx_c _poa_b0_l0 _fs_14_000000b0'>
          <Div s='_wf_50 _ph_10 _fx_rb'>
            {
              props.anySelect &&
              <Div s='_r_15_c3c3c3 _fx_rc' onPress={close}>
                <Div s='_close_8_1_white'></Div>
              </Div> ||
              <Div></Div>
            }
            <Div s='_fs_16_000000'>区域选择</Div>
            {
              !props.anySelect ?
                <Icon icon="close-circle-outline" size={18} color="#d3d3d3" onPress={close}></Icon>
                : state.selectItem ?
                  <Icon icon='AntDesign:checkcircle' color='#00a327' size='18' onPress={selectAddress}></Icon> :
                  <Div></Div>
            }
          </Div>
          {/* 水平滚动栏 */}
          <Div s='_fx_r _hm_50 _pv_14 _ph_14 _bov_f0f0f0'>
            <ScrollView horizontal>
              {
                _.map(showAddressList, (item: any, i: number) => (
                  <Div s='_mh_6 _fx_ccc _por' key={item.code + '_' + i} onPress={() => onAddressClick(item, i)}>
                    <Div s={[`_nowrap`, item.code === activeCode && `_c_FFB900`]}>{item.name}</Div>
                    {item.code === activeCode && <Div s='_s_40_1_FFB900 _poa_t20'></Div>}
                  </Div>
                ))}
              <Div s='_sm_20_1'></Div>
            </ScrollView>
          </Div>
          {/* 竖直滚动栏 */}
          <Div s='_fx_r_1 _por _pl_20'>
            <ScrollView>
              {
                _.map(showList, (item: any) => (
                  <Div s='_mv_10 _fx_rb _pr_10' key={item.code} id={'address_item_' + item.code} onPress={() => onNodeClick(item)}>
                    <Div s={item.code === activeCode && `_c_ff6b35`}>{item.name}</Div>
                    {
                      props.anySelect &&
                      <Div s='_h_20 _fx_r_je_1 _wmax_100' onPress={() => onNodeSelect(item)}>
                        {
                          item.code === state.selectItem?.code &&
                          <Icon icon='AntDesign:checkcircle' color='#00a327' size='16'></Icon> ||
                          <Div s='_r_16 _bo_gray'></Div>
                        }
                      </Div>
                    }
                    {item.code === activeCode && <Icon icon='AntDesign:check' color='#00a327' size='14'></Icon>}
                  </Div>
                ))
              }
            </ScrollView>
          </Div>
        </Div>
      </Div>
    </Modal>
  )
});
