import type { PropsWithChildren } from 'react';
import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { FlatList, View, Text, TouchableHighlight } from 'react-native';

type Props = PropsWithChildren<{
  title?: any, // 标题
  label?: any, // tab页面传过来的label
  pageStyle?: any, // 容器样式
  list?: any, // 传入的数据
  filterFields?: any, // 过滤的字段，如['name', 'phone']
  showDetail?: any, // 显示详情
  pageName?: any, // 选择模式下对应的pageName
  pageData?: any, // 选择模式下对应的页面配置
  onSelect?: any, // 选择模式下选择回调函数
  onGetList?: any, // 获取列表回调函数
  multi?: boolean, // 是否是多选
  selectedIds?: any, // 已经选中的ids，由idKey决定，默认为id
  valueKey?: any, // 决定selectedIds的字段
  initParams?: any, // 传递过来的创建的附加参数
  params?: any, // 传递过来的获取列表的请求附加参数
  notPage?: any, // 不是页面模式，单纯的列表
  hideNavbar?: boolean, // 隐藏导航栏，导航栏不占用位置
  transparentNavbar?: boolean, // 透明导航栏，导航栏占用位置
  emptyNavbar?: boolean, // 空导航栏，导航栏占用位置
  hideTop?: boolean, // 隐藏顶部
  bottomSlotHeight?: number, // 多选的底部的高度，默认是50
  onSelectChange?: any, // 选择的时候发生变化
  emptyText?: any, // 列表为空时的文字提示
  rowStyle?: any, // 行的样式
  readonly?: boolean, // 是否是只读
  listeners?: any, // 中央消息总线的消息，格式形如: {BUS_NEW_MESSAGE_NF: ()=>...}
  callback?: any, // 详情页面的回调函数，会返回参数
  other?: any, // 附加属性
  initSearchKeyword?: any, // 初始搜索关键字
  renderItem?: any, // 显示每一行数据
}>;

export default forwardRef((props: Props, ref) => {
  // 普通全局变量
  let searchOptions = {}; // 搜索的参数
  let refreshParams: any; // 刷新列表的时候传过来的参数

  const { personal } = useRedux('personal'); // 全局个人信息
  const { option } = useRedux('option'); // 全局变量

  const [dataList, setDataList] = useState([] as any); // 列表
  const [totalCount, setTotalCount] = useState(0); // 所有数量
  const [loading, setLoading] = useState(false); // 列表加载状态
  const [finished, setFinished] = useState(true); // 是否加载完成
  const [pageNo, setPageNo] = useState(0); // 页号
  const [selectedCount, setSelectedCount] = useState(0); // 被选中的元素
  const [filterOptions, setFilterOptions] = useState({}); // 过滤的参数

  const getPageData = () => { // 页面配置
    searchOptions = {}; // pageData变化的时候需要重置searchOptions
    let propsPageData = props.pageData;
    // 如果传了pageData，则使用pageData作为页面配置，pageData可以是函数
    propsPageData = (_.isFunction(propsPageData) ? propsPageData({ personal, option, other: props.other }) : propsPageData) || {};

    if (_.isFunction(propsPageData.fields)) { // 修正fields
      propsPageData.fields = propsPageData.fields({ personal, option, other: props.other });
    }
    return propsPageData;
  };
  const pageData = getPageData();
  const sortOptions = pageData.sort; // 排序的参数
  const pageSize = pageData.pageSize || 20; // 页距


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
      params = listParams({ params, pageData, personal, option, other: props.other });
    } else {
      params = { ...params, ...(listParams || {}) };
    }
    // return console.log('params = ', params);
    if (pageData.getListPreHook && !(await pageData.getListPreHook({ params, pageData, personal, option, other: props.other }))) { // 拉取列表前的判断钩子函数
      return;
    }
    let data;
    if (!params) { // 如果没有params，则不拉取数据
      data = { success: true, result: { list: [] } };
    } else {
      if (_.isFunction(pageData.apis?.list)) {
        data = await pageData.apis?.list({ params, pageData, personal, option, other: props.other });
      } else {
        const api = pageData.apis?.list?.url || pageData.apis?.list || `/list/${pageData.table || pageData.name}`;
        data = await utils.post(api, params);
      }
    }
    setLoading(false);
    if (!data.success) { // 如果服务器返回成功
      data.result = { total: 0, list: [] };
    }
    setPageNo(pageNo + 1); // 拉取了第一个页的数据后，就应该拉取第二页
    if (data.result.list.length < pageSize) { // 说明已经拉取完成
      setFinished(true);
    }
    props.onGetList && props.onGetList({ result: data.result, params });
    let list = pageData.testCount ? _.grow(data.result.list, pageData.testCount) : data.result.list;
    if (pageData.listFormat) { // 如果pageData设置了对list过滤的函数，则过滤
      list = pageData.listFormat(list, { pageNo, params, pageData, personal, option, other: props.other });
    }
    setTotalCount(data.result.total);
    setDataList([...dataList, ...list]);
  }
  const refreshList = (params?: any) => { // 刷新列表
    if (pageData.list || props.list) { // 如果是传入了list，则不需要刷新
      return;
    }
    setDataList([]);
    setPageNo(0);
    setFinished(false);
    refreshParams = params;
    getList();
  }

  const renderItem = ({ item, index, separators }: any) => {
    if (pageData.renderItem) {
      return pageData.renderItem({ item, index, separators });
    }
    if (props.renderItem) {
      return props.renderItem({ item, index, separators });
    }
    return (
      <View style={[_u(`_fx_r`), pageData.rowStyle, props.rowStyle]}>

        <View style={_u(`_fx_r_1 _por`)}>
          {isMultiSelect && <Checkbox></Checkbox>}
          <radio v-if="isMultiSelect" @click.stop="onRadioClick(item)" :value="item.id" activeBackgroundColor="#06BE62" class="_ml_10 _scale_0.6" :checked="item.selected" />
          <!-- 默认插槽 -->
          <slot v-if="$slots.default" :item="item" :i="i" :pageData="pageData" :page="page"></slot>
        <!-- 行数据 -->
        <Row v-else class="_w_100%" :item="item" :pageData="pageData" :readonly="readonly" :page="page"></Row>
          </View >
        <View v-if="hasArrow" class="_wm_20">
          <View class="_arrow"></View>
        </View> 
      </View >
    );
  }

useEffect(() => {
  refreshList();
}, []);

// useImperativeHandle(ref, () => ({ show, close })); // 暴露函数组件内部方法

return (
  <View style={_u(`_fx_ccc`)}>
    <Text style={_u(`_w_375`)}>{JSON.stringify(dataList)}</Text>
    <FlatList
      data={dataList}
      renderItem={renderItem}
    />
  </View>
);
});
