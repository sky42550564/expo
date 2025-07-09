import { Text, TouchableOpacity } from 'react-native';
import { Tooltip } from '@ant-design/react-native'

export default ({
  form, // 整个form
  prop, // 字段名
  label, // 标签
  labelLeft, // 标签的左边宽度
  labelWidth, // 标签的宽度
  labelRight, // 标签的右边宽度
  noLabel, // 不显示标签
  required, // 必选
  disabled = false, // 是否禁用
  placeholder, // 默认显示
  table, // 指定获取对应的页面的数据的数据库
  api, // 指定获取对应的页面的数据的接口，和table二选一
  sortOptions, // 排序参数
  searchOptions, // 搜索参数
  valueKey = 'id', // 获取的字段
  labelKey = 'name', // 显示的字段
  dependParams, // 选择的时候的附加参数，会生成附加参数在form里面
  width = 150, // 宽度
  height = 200, // 高度
  search, // 搜索
  onChange, // 监听变化时的回调
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const tooltipRef = useRef(null);
  const listRef = useRef(null);

  const getLabel = (value: any) => {
    const list = listRef.current.getDataList();
    return _.findGet(list, (o: any) => o[valueKey] === value, labelKey);
  }

  const pageData = useComputed(() => {
    return {
      search,
      searchPlaceholder: '关键字',
      table,
      params: searchOptions,
      sort: sortOptions,
      ...(api ? { apis: { list: api } } : {}),
      renderItem: ({ item }: any) => {
        return <Text style={_u(`_fx_1 _tc`)}>{labelKey ? item[labelKey] : item}</Text>
      }
    }
  }, []);

  const onSelect = (item: any, index: any) => {
    const value = item[valueKey];
    onChange && onChange(value);
    form.set(prop, value);
    if (dependParams) { // 如果有附加参数，设置附加参数，比如要获取的时id，同时需要获取parentId的时候就使用附加参数
      for (const param of dependParams) {
        form.set(param.name, _.isFunction(param.valueKey) ? param.valueKey(item) : _.get(item, param.valueKey));
      }
    }
    tooltipRef.current.hide();
  }

  const renderList = () => {
    return (
      <Div style={_u(`_s_${width}_${height} _por`)} onPress={(event: any) => event.stopPropagation()}>
        <ListPage ref={listRef} pageData={pageData} onSelect={onSelect} hideTop={!search} renderFooter={() => null}></ListPage>
      </Div>
    )
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <Tooltip ref={tooltipRef} content={renderList()} trigger='onPress'>
        <TouchableOpacity style={_u(`_fx_1 _h_30 _fx_rb`)}>
          <Div s={`_fs_14 _ml_8px ${form.data[prop] === undefined ? `` : `_c_c0c4cc`}`}>{form.data[prop] !== undefined ? getLabel(form.data[prop]) : (placeholder || `请选择${label}`)}</Div>
          {!disabled && <Div s='_arrow'></Div>}
        </TouchableOpacity>
      </Tooltip>
    </FormLabel>
  );
};
