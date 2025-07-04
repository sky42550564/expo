import { Input, Tooltip } from '@ant-design/react-native';

export default ({
  pageData, // 页面配置
  filterFields, // 设置过滤函数
  initSearchKeyword = '', // 初始关键字
  itemStyle = _u(`_w_315`), // 样式
  setSearchOptions, // 设置搜索选项的回调
}: any) => {
  const [keyword, setKeyword] = useState(initSearchKeyword);
  const [results, setResults] = useState(_.isArray(pageData.search) && !_.isString(pageData.search[0]) ? _.map(pageData.search, (list: any) => ({ // 接收结果
    name: '',
    form: list.reduce((r: any, v: any) => ({ ...r, [v.name]: '' }), {}),
  })) : []);

  const onInputChange = (e: any) => {
    setKeyword(e.target.value);
  }

  const v = (item: any, key: any, defaultValue: any) => {
    const value = (item.value || {})[key];
    return value == null ? defaultValue : value;
  }

  const onSearch = () => {
    let search: any = {};
    if (filterFields) { // 如果传了过滤字段，有限使用过滤字段
      if (keyword) {
        const key = filterFields.join('|');
        search = { [key]: `/${keyword}/` };
      }
    } else if (pageData.search === true) { // 如果search为true,则使用搜索框搜索所有的字段
      if (keyword) {
        const key = _.joinBy(pageData.fields, 'name', '|');
        search = { [key]: `/${keyword}/` };
      }
    } else if (_.isArray(pageData.search) && _.isString(pageData.search[0])) { // 如果是字符串数组，则使用搜索框搜索数组包含的字段
      const key = _.join(pageData.search, '|');
      search = { [key]: `/${keyword}/` };
    } else {
      for (const i in results) {
        const item = results[i];
        if (item.name && item.form[item.name]) {
          const searchItem = _.find(pageData.search[i], o => o.name === item.name);
          if (_.get(searchItem, 'value.type') === 'text' && !_.get(searchItem, 'value.full')) {
            search[item.name] = `/${item.form[item.name]}/`; // 如果不是全文匹配的用模糊搜索
          } else {
            search[item.name] = item.form[item.name];
          }
        }
      }
    }
    setSearchOptions(search);
  }

  return (
    (pageData.search === true || (_.isArray(pageData.search) && _.isString(pageData.search[0]))) &&
    <Div s='_fx_rc_1'>
      <Div s='_fx_1 _p_6_10'>
        <Input inputStyle={_u(`_p_6_10`)} placeholder='输入关键字搜索' allowClear maxLength={20} value={keyword} onChange={onInputChange} />
      </Div>
      <Icon icon='AntDesign:search1' color='gray' size={20} onPress={onSearch} s='_mh_6'></Icon>
    </Div >
    ||
    <Div s='_fx_r_1 _mv_6'>
      {
        _.map(pageData.search, (list: any, i: any) => (
          <Div key={i} s={['_fx_r', itemStyle]}>
            <Tooltip.Menu
              actions={list.map((o: any) => ({ text: o.label, key: o.name }))}
              onAction={(item: any) => results[i].name = item.key}
              trigger="onPress">
              <Div s='_s_100_40_red'>
                {results[i].form.label}
              </Div>
            </Tooltip.Menu>
            <Div>{list}</Div>
          </Div>
        ))
      }
      <Icon icon='AntDesign:search1' color='gray' size={20} onPress={onSearch}></Icon>
    </Div >
  )
}

