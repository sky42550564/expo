import type { PropsWithChildren } from 'react';
import React from 'react';
import { useState, forwardRef, useImperativeHandle } from 'react';


type Props = PropsWithChildren<{
  pageData?: any, // 选择模式下对应的页面配置
  params?: any, // 传递过来的获取列表的请求附加参数
  hideTop?: boolean, // 隐藏顶部
  notPage?: any, // 不是页面模式，单纯的列表
  pageStyle?: any, // 容器样式
  hideNavbar?: boolean, // 隐藏导航栏，导航栏不占用位置
  transparentNavbar?: boolean, // 透明导航栏，导航栏占用位置
  emptyNavbar?: boolean, // 空导航栏，导航栏占用位置
  listeners?: any, // 中央消息总线的消息，格式形如: {BUS_NEW_MESSAGE_NF: ()=>...}
  other?: any, // 附加属性
}>;


export default forwardRef((props: Props, ref) => {
  const other = props.other;
  const params = props.params || {};
  const { store: singletonStore } = useRedux('singleton');

  const listRef = useRef(null);
  const [state, setState] = useState({
    tabs: [], // tabs
    currentTab: null as any, // 当前Tab
    activeTabValue: 0, // 当前激活页面
  });


  const pageData = useComputed(() => { // 页面配置
    let propsPageData = props.pageData;
    // 如果传了pageData，则使用pageData作为页面配置，pageData可以是函数
    propsPageData = (_.isFunction(propsPageData) ? propsPageData({ other }) : propsPageData) || {};

    if (_.isFunction(propsPageData.fields)) { // 修正fields
      propsPageData.fields = propsPageData.fields({ other });
    }
    return propsPageData;
  }, []);

  // 刷新表格
  const refreshList = () => {
    utils.until(() => listRef.current, () => listRef.current.refreshList());
  }

  // 如果是数字的需要转化为数字
  const format = (v: any) => {
    return +v == v ? +v : v;
  }

  const getTabs = async () => { // 和tabs的页面一致
    let list = [];
    const options = pageData.tabs;
    if (!options) return;
    if (options.map) {
      if (_.isArray(options.map)) {
        list = _.map(options.map, (o: any, i: any) => ({ label: o.label, value: pageData.tabs.field ? format(o[pageData.tabs.field]) : i })); // 如果指定了field，则为field的值，否则为下标序号，搜索会用map的params
      } else {
        list = _.map(options.map, (o: any, k: any) => ({ label: o, value: format(k) }));
      }
    } else {
      list = await singletonStore.getType(options.singleton, { pageData: pageData, other }) || [];
      list = list.map((o: any) => ({ label: _.get(o, options.singleton.labelKey, 'name'), value: _.get(o, options.singleton.valueKey, 'id') }));
    }
    options.hasAll && list.unshift({ label: '全部', value: '$all' });
    state.activeTabValue = list[0]?.value;
    state.currentTab = list[0];
    state.tabs = list;
    utils.until(() => listRef.current, refreshList);
  }
  const onTabChange = (value: any, item: any) => {
    state.activeTabValue = value;
    state.currentTab = item;
  }
  // 暴露出刷新表格的方法
  pageData.refreshTabTable = refreshList;

  useEffect(() => {
    refreshList();
  }, []);

  useEffect(() => {
    getTabs();
  }, pageData);

  useImperativeHandle(ref, () => { refreshList }); // 暴露函数组件内部方法

  return (
    <Div s='_full _fx_cc _pt_20'>
      <Tabs tabs={state.tabs} valueKey='value' labelKey='label' onChange={onTabChange}></Tabs>
      <Div s='_fx_1 _por'>
        <ListPage ref={listRef} pageData={{ ...pageData, tabIndex: state.activeTabValue }} params={pageData.tabs.field ? { [pageData.tabs.field]: state.activeTabValue, ...params } : pageData.tabs.map[state.activeTabValue].params ? { ...pageData.tabs.map[state.activeTabValue].params, ...params } : params} initParams={pageData.tabs.field ? { [pageData.tabs.field]: state.activeTabValue, ...params } : pageData.tabs.map[state.activeTabValue].params ? { ...pageData.tabs.map[state.activeTabValue].params, ...params } : params} label={state.currentTab?.label}>
          {props.children}
        </ListPage>
      </Div>
    </Div >
  );
});


