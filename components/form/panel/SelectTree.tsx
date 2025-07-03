import { forwardRef, useImperativeHandle } from 'react';
import { ScrollView, Modal } from 'react-native';

type Props = {
  initValue: any, // 初始值
  anySelect: boolean, // 是否能任意选择
  table: string, // 对应的表
  parents: any, // 父级搜索参数，默认为：{ parentId: { parentField: 'id', initValue: null } }
  setValueLabel: any, // 更新valueLabel
  onSelect: any, // 选择的回调
};

export default forwardRef((props: Props, ref) => {
  const [state, setState] = useState({
    visible: false,
    list: [],
    activeIndex: 0,
    targetList: [],
    selectItem: null,
  });

  const showList = useComputed(() => state.list[state.activeIndex] || [], [state]);
  const showTargetList = useComputed(() => _.get(_.last(state.targetList), 'isLeaf') ? state.targetList : [...state.targetList, { name: '请选择' }], [state]);
  const activeId = useComputed(() => _.get(state.targetList[state.activeIndex], 'id'), [state]);

  const getList = async (parentId = null) => {
    const params = { pageSize: 1000, parentId };
    const data = await utils.post(`/list/tb_region`, params);
    if (data.success) {
      return data.result.list.map((o: any) => ({ name: o.name, isLeaf: props.leafLevels.includes(o.level), id: o.id }));
    }
    return null;
  }
  const getInitList = async () => {
    const { initValue } = props;
    if (initValue) {
      const selectedIds = _.isArray(initValue) ? initValue : [initValue];
      const params = { parents: props.parents, selectedIds };
      const data = await utils.post(`/treeWithIds/${props.table}`, params);
      if (data.result) {
        let childList = data.result.list;
        const list = [childList];
        const expandedKeys = data.result.expandedKeys;
        for (const id of expandedKeys) {
          const item = _.find(childList, (o: any) => o.id === id);
          if (!item) break;
          state.targetList.push(item);
          childList = item.children;
          childList?.length && (list.push(childList));
        }
        const item = _.find(childList, (o: any) => o.id === initValue);
        if (item) {
          state.targetList.push(item);
          props.setValueLabel(item.name);
        }
        state.list = list;
        state.activeIndex = state.targetList.length - 1;
        setState({ ...state });
      }
    }
  }

  const onTargetClick = (item: any, i: any) => {
    state.activeIndex = i;
    setState({ ...state });
  }

  const onNodeClick = async (item: any) => {
    if (state.targetList.length > state.activeIndex) {
      state.targetList = state.targetList.slice(0, state.activeIndex);
      state.list = state.list.slice(0, state.activeIndex + 1);
    }
    state.selectItem = null;
    if (item.isLeaf) {
      if (props.anySelect) {
        state.selectItem = item;
      } else {
        state.targetList.push(item);
        props.onSelect(state.targetList);
        state.visible = false;
      }
    } else {
      const list = await getList(item.id);
      list && state.list.push(list);
      state.targetList.push(item);
      state.activeIndex++;
    }
    setState({ ...state });
  }

  const onNodeSelect = async (item: any) => {
    state.selectItem = item;
    setState({ ...state });
  }

  const selectTarget = () => {
    props.onSelect([...state.targetList, state.selectItem]);
    state.visible = false;
    setState({ ...state });
  }

  const show = async () => {
    state.visible = true;
    if (!state.list?.length) { // 如果没有拉去过初始数据
      if (!props.initValue) {
        const list = await getList(null);
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
            <Div s='_fs_16_000000'>选择</Div>
            {
              !props.anySelect ?
                <Icon icon="close-circle-outline" size={18} color="#d3d3d3" onPress={close}></Icon>
                : state.targetList.length || state.selectItem ?
                  <Icon icon='AntDesign:checkcircle' color='#00a327' size='18' onPress={selectTarget}></Icon> :
                  <Div></Div>
            }
          </Div>
          {/* 水平滚动栏 */}
          <Div s='_fx_r _hm_50 _pv_14 _ph_14 _bov_f0f0f0'>
            <ScrollView horizontal>
              {
                _.map(showTargetList, (item: any, i: number) => (
                  <Div s='_mh_6 _fx_ccc _por' key={item.id + '_' + i} onPress={() => onTargetClick(item, i)}>
                    <Div s={[`_nowrap`, item.id === activeId && `_c_FFB900`]}>{item.name}</Div>
                    {item.id === activeId && <Div s='_s_40_1_FFB900 _poa_t20'></Div>}
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
                  <Div s='_mv_10 _fx_rb _pr_10' key={item.id} id={'target_item_' + item.id} onPress={() => onNodeClick(item)}>
                    <Div s={item.id === activeId && `_c_ff6b35`}>{item.name}</Div>
                    {
                      props.anySelect &&
                      <Div s='_h_20 _fx_r_je_1 _wmax_100' onPress={() => onNodeSelect(item)}>
                        {
                          item.id === state.selectItem?.id &&
                          <Icon icon='AntDesign:checkcircle' color='#00a327' size='16'></Icon> ||
                          <Div s='_r_16 _bo_gray'></Div>
                        }
                      </Div>
                    }
                    {item.id === activeId && <Icon icon='AntDesign:check' color='#00a327' size='14'></Icon>}
                  </Div>
                ))
              }
            </ScrollView>
          </Div>
        </Div>
      </Div>
    </Modal >
  )
});
