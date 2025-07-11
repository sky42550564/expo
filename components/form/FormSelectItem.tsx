import { Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
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
  options, // 默认是数组，如: ['汉族', '苗族']：值为：0，1；也可以为集合：[{ id: 1, name: '汉族' }]
  valueKey, // 获取的字段，默认为数字下标 ([0,1])，$s: 字符串下标(['0','1'])，$: 直接使用label为值 如: ['汉族', '苗族']：值为：汉族，苗族，'，如果[{ id: 1, name: '汉族' }]，可设置为id
  labelKey, // 显示的字段，默认为数组的一项，如'汉族'，如果[{ id: 1, name: '汉族' }]，可设置为name
  width = 150, // 宽度
  onChange, // 监听变化时的回调
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const getValue = (v: any, k: any) => {
    if (valueKey === '$') {
      return v; // 返回值
    }
    if (valueKey === '$s') {
      return k + ''; // 返回字符串
    }
    if (valueKey) {
      return v[valueKey];
    }
    return +k;
  }

  const showLabel = useComputed(() => {
    if (form.data[prop] == undefined) return undefined;
    const item = _.find(options, (v: any, k: any) => getValue(v, k) === form.data[prop]);
    return labelKey ? item[labelKey] : item;
  }, [form.data[prop]]);

  const onSelect = (value: any) => {
    onChange && onChange(value);
    form.set(prop, value);
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <Tooltip.Menu
        actions={options.map((v: any, k: any) => ({ text: labelKey ? v[labelKey] : v, key: getValue(v, k) }))}
        onAction={(item: any) => onSelect(item.key)}
        placement="bottom-start"
        trigger="onPress">
        <TouchableOpacity style={_u(`_s_${width}_30 _fx_1 _fx_rb`)}>
          <Div s={`_fs_14 _ml_8px ${showLabel ? `` : `_c_c0c4cc`}`}>{showLabel ? showLabel : (placeholder || `请选择${label}`)}</Div>
          {!disabled && <Div s='_arrow _mr_10'></Div>}
        </TouchableOpacity>
      </Tooltip.Menu>
    </FormLabel>
  );
};
