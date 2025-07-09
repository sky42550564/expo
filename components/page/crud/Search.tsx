import { Input, Tooltip, Button } from '@ant-design/react-native';
import { Text, View, TouchableOpacity } from 'react-native';

export default ({
  pageData, // 页面配置
  filterFields, // 设置过滤函数
  initSearchKeyword = '', // 初始关键字
  setSearchOptions, // 设置搜索选项的回调
  searchPlaceholder = '输入关键字搜索', // 搜索的placeholder
}: any) => {
  const [keyword, setKeyword] = useState(initSearchKeyword);
  const [results, setResults] = useState(_.isArray(pageData.search) && !_.isString(pageData.search[0]) ? _.map(pageData.search, (list: any) => ({ // 接收结果
    name: '',
    label: '',
    form: useForm(list.reduce((r: any, v: any) => ({ ...r, [v.name]: '' }), {})),
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
        const value = item.form.data[item.name];
        if (item.name && value) {
          const searchItem = _.find(pageData.search[i], (o: any) => o.name === item.name);
          if (_.get(searchItem, 'value.type') === 'text' && !_.get(searchItem, 'value.full')) {
            search[item.name] = `/${value}/`; // 如果不是全文匹配的用模糊搜索
          } else {
            search[item.name] = value;
          }
        }
      }
    }
    setSearchOptions(search);
  }

  const renderForm = (item: any, i: number) => {
    if (!item) return null;
    return <FormItem label={item.label} prop={item.name} value={item.value} field={item} form={results[i].form} required={false} noLabel />
  }

  return (
    (pageData.search === true || (_.isArray(pageData.search) && _.isString(pageData.search[0]))) &&
    <Div s='_fx_rc_1'>
      <Div s='_fx_1 _p_6_10'>
        <Input inputStyle={_u(`_p_6_10 _bo _br_4`)} placeholder={searchPlaceholder} allowClear maxLength={20} value={keyword} onChange={onInputChange} />
      </Div>
      <Icon icon='AntDesign:search1' color='gray' size={20} onPress={onSearch} s='_mh_6'></Icon>
    </Div >
    ||
    <Div s='_fx_r_ac'>
      <Div s='_fx_1_c'>
        {
          _.map(pageData.search, (list: any, i: any) => (
            <Div key={i} s={['_fx_1_rc _hm_50']}>
              <Tooltip.Menu
                actions={list.map((o: any, k: any) => ({ text: o.label, key: o.name }))}
                onAction={(item: any) => { setResults((prev: any) => { prev[i].name = item.key; prev[i].label = item.text; return [...prev] }) }}
                trigger="onPress">
                <TouchableOpacity style={_u(`_s_100_30 _fx_rc`)}>
                  {
                    results[i].label &&
                    <Div s='_fx_rb _fs_14'>
                      <Text>{results[i].label}：</Text>
                      <Icon icon='AntDesign:closecircleo' size={12} color='gray' onPress={() => { setResults((prev: any) => { prev[i].name = ''; prev[i].label = ''; return [...prev] }) }}></Icon>
                    </Div>
                    ||
                    <Text style={_u(`_fs_14_gray`)}>请选择</Text>
                  }
                </TouchableOpacity>
              </Tooltip.Menu>
              <Div s='_fx_1'>
                {renderForm(_.find(list, (o: any) => results[i].name === o.name), i)}
              </Div>
            </Div>
          ))
        }
      </Div>
      <Icon icon='AntDesign:search1' color='gray' size={20} onPress={onSearch} s='_mh_10'></Icon>
    </Div >
  )
}

