import type { PropsWithChildren } from 'react';
import React from 'react';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { SearchBar } from '@ant-design/react-native';
import Item from './Item';

type Props = PropsWithChildren<{
  label?: any, // tab页面传过来的label
  pageStyle?: any, // 容器样式
  list?: any, // 传入的数据
  filterFields?: any, // 过滤的字段，如['name', 'phone']
  showDetail?: any, // 显示详情
  pageName?: any, // 选择模式下对应的pageName
  pageData?: any, // 选择模式下对应的页面配置
  onSelect?: any, // 选择模式下选择回调函数
  onGetList?: any, // 获取列表回调函数
  filterOptions?: any, // 过滤的参数
  multi?: boolean, // 是否是多选
  selectedIds?: any, // 已经选中的ids，由idKey决定，默认为id
  valueKey?: any, // 决定selectedIds的字段
  initParams?: any, // 传递过来的创建的附加参数
  params?: any, // 传递过来的获取列表的请求附加参数
  hideTop?: boolean, // 隐藏顶部
  bottomSlotHeight?: number, // 多选的底部的高度，默认是50
  onSelectChange?: any, // 选择的时候发生变化
  emptyText?: any, // 列表为空时的文字提示
  readonly?: boolean, // 是否是只读
  listeners?: any, // 中央消息总线的消息，格式形如: {BUS_NEW_MESSAGE_NF: ()=>...}
  callback?: any, // 详情页面的回调函数，会返回参数
  other?: any, // 附加属性
  initSearchKeyword?: any, // 初始搜索关键字
  renderItem?: any, // 显示每一行数据
  renderSeparator?: any, // 显示分割线
  renderEmpty?: any, // 显示空列表
  renderHeader?: any, // 显示头部
  renderFooter?: any, // 显示尾部
}>;

export default forwardRef((props: Props, ref) => {
  // 普通全局变量
  let searchOptions = {}; // 搜索的参数
  let refreshParams: any; // 刷新列表的时候传过来的参数
  const other = props.other;

  const { personal } = useRedux('personal'); // 全局个人信息
  const { option } = useRedux('option'); // 全局变量

  const [dataList, setDataList] = useState([] as any); // 列表
  const [totalCount, setTotalCount] = useState(0); // 所有数量
  const [loading, setLoading] = useState(false); // 列表加载状态
  const [finished, setFinished] = useState(false); // 是否加载完成
  const [selectedCount, setSelectedCount] = useState(0); // 被选中的元素
  const [filterOptions, setFilterOptions] = useState(props.filterOptions); // 过滤的参数

  const getPageData = () => { // 页面配置
    searchOptions = {}; // pageData变化的时候需要重置searchOptions
    let propsPageData = props.pageData;
    // 如果传了pageData，则使用pageData作为页面配置，pageData可以是函数
    propsPageData = (_.isFunction(propsPageData) ? propsPageData({ personal, option, other }) : propsPageData) || {};

    if (_.isFunction(propsPageData.fields)) { // 修正fields
      propsPageData.fields = propsPageData.fields({ personal, option, other });
    }
    return propsPageData;
  };
  const pageData = getPageData();
  const sortOptions = pageData.sort; // 排序的参数
  const pageSize = pageData.pageSize || 20; // 页距
  let pageNo = 0; // 页号

  const isSingleSelect = useComputed(() => !!props.onSelect && !props.multi, [props]); // 是否是单选
  const isMultiSelect = useComputed(() => !!props.onSelect && props.multi, [props]); // 是否是多选
  const readonly = useComputed(() => props.readonly || pageData.readonly, [props]); // 是否是只读
  const hasCUD = useComputed(() => !readonly && _.some(pageData.fields, (o: any) => _.get(o, 'value.type') && _.get(o, 'value.edit') !== false && _.get(o, 'value.readonly') !== true), [props]); // 判断是否可以有cud的操作，只要有一个字段有value.type并且不为readonly就可以编辑
  const createButtonVisible = useComputed(() => hasCUD && pageData.createButtonVisible, [props]); // 创建按钮是否显示
  const modifyButtonVisible = useComputed(() => hasCUD && pageData.modifyButtonVisible, [props]); // 创建按钮是否显示
  const removeButtonVisible = useComputed(() => hasCUD && pageData.removeButtonVisible, [props]); // 创建按钮是否显示
  const hasInitialList = useComputed(() => pageData.list || props.list, [props]); // 是否有初始的列表
  const emptyText = useComputed(() => pageData.emptyText || props.emptyText, [props]); // 空列表的提示语
  const showList = useComputed(() => { // 显示列表
    if (!filterOptions) { // 格式：{ 'name|phone': '/123/', 'age': '/123/' }
      return dataList;
    }
    return _.filter(dataList, (o: any) => {
      for (const key in filterOptions) {
        const v = filterOptions[key];
        if (v === '//' || !v) return true;
        const keyList = key.split('|');
        for (const k of keyList) {
          if (/^\/.*\/$/.test(v) && utils._r(v.slice(1, -1)).test(o[k])) return true;
          else if (v === o[k]) return true;
        }
      }
    });
  }, [dataList, filterOptions]);
  const hasArrow = useComputed(() => _.get(pageData, 'hasArrow', false)); // 是否有箭头
  const label = useComputed(() => props.label || pageData.label);
  const initSearchKeyword = useComputed(() => props.initSearchKeyword || pageData.initSearchKeyword);  // 初始搜索关键字
  const searchButtons = useComputed(() => { // 搜索按钮定义的按钮
    return _.filter(pageData?.searchOpers, (o: any) => utils.visible(o.visible, { pageData, personal, option, other }));
  });

  const formatStringLookup = (lookup: any) => {
    if (_.isString(lookup)) { // 解析简化的lookup
      return lookup.split(',').reduce((r: any, o: any) => {
        if (o.includes(':')) {
          const its = o.split(':');
          r[its[0]] = its[1];
        } else {
          r[o] = o.replace(/Id$/, '');
        }
        return r;
      }, {});
    }
    return lookup;
  }
  // 定义一个获取列表的接口
  const getList = async () => {
    if (!_.size(pageData)) {
      return;
    }
    setLoading(true); // 开始拉取数据的时候开始转圈
    // targetId: { table: 'tb_member' } -> targetId: tb_member
    // pictureCount: { api: { url: '/count/picture', params: { designerId: '$.targetId' }, resultKey: 'count' } } -> pictureCount: { url: '/count/picture', params: { designerId: '$.targetId' }, resultKey: 'count' }
    let lookup = _.filter(pageData.fields, (o: any) => o.lookup || _.get(o, 'value.table') || _.get(o, 'value.api')).reduce((r: any, o: any) => ({ ...r, [o.name]: o.lookup || o.value.table || o.value.api }), {});
    if (pageData.lookup) { //  pageData的lookup只针对list
      lookup = { ...lookup, ...formatStringLookup(pageData.lookup) };
    }
    if (pageData.apis?.list?.lookup) { // 设置在apis.list的lookup
      lookup = { ...lookup, ...formatStringLookup(pageData.apis.list.lookup) };
    }
    let params = {
      pageNo, // 页号，第几页的数据，从0开始
      pageSize, // 页距，每页拉取多少个数据
      $sort: sortOptions, // 排序参数
      ...(props.params || {}),
      ...searchOptions,
      $lookup: _.size(lookup) ? lookup : undefined, // 关联表
      ...(refreshParams || {}), // refresh传过来的参数
    };
    let listParams = pageData.params?.list; // pageData通过{params:{ list: ... }} 传过来的参数
    if (_.isFunction(listParams)) {
      params = listParams({ params, pageData, personal, option, other });
    } else {
      params = { ...params, ...(listParams || {}) };
    }
    // return console.log('params = ', params);
    if (pageData.getListPreHook && !(await pageData.getListPreHook({ params, pageData, personal, option, other }))) { // 拉取列表前的判断钩子函数
      return;
    }
    let data;
    if (!params) { // 如果没有params，则不拉取数据
      data = { success: true, result: { list: [] } };
    } else {
      if (_.isFunction(pageData.apis?.list)) {
        data = await pageData.apis?.list({ params, pageData, personal, option, other });
      } else {
        const api = pageData.apis?.list?.url || pageData.apis?.list || `/list/${pageData.table || pageData.name}`;
        data = await utils.post(api, params);
      }
    }
    setLoading(false);
    if (!data.success) { // 如果服务器返回成功
      data.result = { total: 0, list: [] };
    }
    pageNo++; // 拉取了第一个页的数据后，就应该拉取第二页
    if (data.result.list.length < pageSize) { // 说明已经拉取完成
      setFinished(true);
    }
    props.onGetList && props.onGetList({ result: data.result, params });
    let list = pageData.testCount ? _.grow(data.result.list, pageData.testCount) : data.result.list;
    if (pageData.listFormat) { // 如果pageData设置了对list过滤的函数，则过滤
      list = pageData.listFormat(list, { pageNo, params, pageData, personal, option, other });
    }
    setTotalCount(data.result.total);
    pageNo == 1 ? setDataList(list) : setDataList([...dataList, ...list]);
  }
  const refreshList = (params?: any) => { // 刷新列表
    if (pageData.list || props.list) { // 如果是传入了list，则不需要刷新
      return;
    }
    pageNo = 0;
    setTotalCount(0);
    setDataList([]);
    setFinished(false);
    refreshParams = params;
    getList();
  }

  // 进入创建页面
  const showCreate = (options?: any) => {
    router.push('/pages/crud/detail', {
      pageData,
      refreshList,
      initParams: props.initParams,
      callback: props.callback,
      other,
      title: `新增${label}`,
      ...options,
    });
  }

  const showDetail = (item: any, options?: any) => { // 进入详情页面
    if (isSingleSelect) {
      return props.onSelect(item);
    }
    if (isMultiSelect) {
      return onRadioClick(item);
    }
    if (pageData.showDetail) {
      return pageData.showDetail({ $: item, pageData: pageData, personal: personal, option: option, other });
    }
    if (props.showDetail) {
      return props.showDetail({ $: item, pageData: pageData, personal: personal, option: option, other });
    }
    if (pageData.notShowDetail) { // 不显示详情页面
      return;
    }
    router.push('/pages/crud/detail', {
      pageData: pageData,
      initParams: props.initParams,
      other,
      callback: props.callback,
      title: `${readonly ? '' : '修改'}${label}${readonly ? '详情' : ''}`,
      ...options,
      record: item,
      readonly: readonly,
      refreshList: pageData.needRefreshListAfterModify && refreshList, // 修改后是否需要更新列表，一般用在整个列表都更改的情况下
    });
  }

  const removeItem = async (item: any) => {
    if (!await $confirm('删除该数据不可恢复，确定要删除吗？')) return;
    const params = { id: item.id };  // 当前数据的id
    const data = await utils.post(pageData.apis?.remove || `/remove/${pageData.table || pageData.name}`, params);
    if (!data.success) { // 如果服务器返回成功
      return $alert(data.message);
    }
    $alert('删除成功'); // 提示成功
    // 刷新列表
    refreshList();
  }

  const onRadioClick = (item: any) => { // 多选是点击选择按钮
    item.selected = !item.selected;
    setSelectedCount(_.filter(dataList, (o: any) => o.selected).length);
    props.onSelectChange && props.onSelectChange(dataList);
  }

  const onMultiSelect = () => { // 点击完成的回调
    props.onSelect(_.filter(dataList, (o: any) => o.selected));
  }

  const updateList = (callback: any) => { // 获取或者更新列表
    const list = callback(dataList);
    if (list) {
      setDataList(list);
    }
  }

  const getShowList = () => { // 获取或者更新可见列表
    return showList;
  }

  // 定义一个page传递给函数或者插槽
  const page = useComputed(() => ({ list: dataList, totalCount, hasCUD, showCreate, showDetail, removeItem, refreshList, setFilterOptions, updateList, getShowList, onMultiSelect }), [dataList, totalCount, hasCUD]);

  const Row = ({ item, index, separators }: any) => {
    return (
      <View style={_u(`_fx_r_1`)}>
        <Item item={item} pageData={pageData} page={page}></Item>
      </View>
    )
  }

  // 显示行内容
  const renderItem = ({ item, index, separators }: any) => {
    const _renderItem = pageData.renderItem || props.renderItem;
    return (
      <View style={[_u(`_fx_r_ac_1 _p_10`)]}>
        <View style={_u(`_fx_r_1`)}>
          {isMultiSelect && <Checkbox s='_self_ac'></Checkbox>}
          {_renderItem ? _renderItem({ item, index, pageData, page }) : <Row {...{ item, index, pageData, page }}></Row>}
        </View>
        {hasArrow && <View style={_u(`_arrow`)}></View>}
        {
          (modifyButtonVisible || removeButtonVisible) &&
          <View style={_u(`_fx_c _ml_6`)}>
            {modifyButtonVisible && <Icon icon='AntDesign:delete' size='10' onPress={() => removeItem(item)}></Icon>}
            {removeButtonVisible && <Icon icon='FontAwesome6:edit' size='10' style={_u(`_mt_20`)} onPress={() => showDetail(item)}></Icon>}
          </View>
        }
      </View>
    );
  }
  // 显示分割线
  const renderSeparator = (scope: any) => {
    const _renderSeparator = pageData.renderSeparator || props.renderSeparator;
    return _renderSeparator ? _renderSeparator(scope) : <View style={_u(`_s_100%_1_#e3e3e3`)} />;
  }
  // 显示空列表
  const renderEmpty = (scope: any) => {
    const _renderEmpty = pageData.renderEmpty || props.renderEmpty;
    if (!finished) return null;
    return _renderEmpty ? _renderEmpty(scope) : (
      <View style={_u(`_fx_ccc _hmin_200`)}>
        <Icon icon='FontAwesome5:box-open' color='#d3d3d3'></Icon>
        <Div class='_fs_12_aaaaaa _mt_10'>{emptyText || '没有相关数据~'}</Div>
      </View>
    );
  }
  // 显示头部
  const renderHeader = (scope: any) => {
    if (props.hideTop) return null;
    const _renderHeader = pageData.renderHeader || props.renderHeader;
    return _renderHeader ? _renderHeader(scope) : (
      <SearchBar cancelText='搜索'></SearchBar>
    );
  }
  // 显示尾部
  const renderFooter = (scope: any) => {
    const _renderFooter = pageData.renderFooter || props.renderFooter;
    return _renderFooter ? _renderFooter(scope) : (
      (pageSize < 1000 && !hasInitialList) &&
      <View style={_u(`_mv_10_20 _fx_rc _wf`)}>
        {
          finished ? (!!totalCount && <Div s='_fs_12_gray'>我是有底线的~</Div>) : loading ?
            <ActivityIndicator size='large' color='#0000ff' /> :
            <Div style={_u(`_bo_dashed _br_4 _fs_12_gray _p_4_10`)}>加载更多</Div>
        }
      </View>
    );
  }

  useEffect(() => {
    refreshList();
  }, []);

  useImperativeHandle(ref, () => page); // 暴露函数组件内部方法

  return (
    <View style={_u(`_full`)}>
      <FlatList
        data={dataList}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
      {createButtonVisible && <Icon icon='AntDesign:pluscircle' color='#2D8CF0' size={50} s='_poa_b20_r20' onPress={() => showCreate()}></Icon>}
      {
        isMultiSelect &&
        <Div s='_wf_50 _poa_l0_b0 _fx_r _bc_f5f5f5'>
          {
            selectedCount &&
            <Div v-if='state.selectedCount' s='_fs_14 _p_4_10 _br_4 _bc_06BE62 _c_white _mr_10' onPress={onMultiSelect}>完成({selectedCount})</Div>
            ||
            <Div s='_fs_14 _p_4_10 _br_4 _bc_efefef _c_c0c0c0 _mr_10'>完成</Div>
          }
        </Div>
      }
    </View>
  );
});

