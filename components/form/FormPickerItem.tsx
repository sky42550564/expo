import { Picker } from '@ant-design/react-native';

function PickerItem(props: any) {
  const { onPress, disabled, label, placeholder, showLabel } = props;
  return (
    <Div s='_fx_1 _h_30 _fx_rb _pr_10' onPress={onPress}>
      <Div s={`_fs_14 _ml_8px ${showLabel ? `` : `_c_c0c4cc`}`}>{showLabel ? showLabel : (placeholder || `请选择${label}`)}</Div>
      {!disabled && <Div s='_arrow'></Div>}
    </Div>
  )
}

export default ({
  form, // form
  prop, // 字段名
  label, // 标签
  labelLeft, // 标签的左边宽度
  labelWidth, // 标签的宽度
  labelRight, // 标签的右边宽度
  noLabel, // 不显示标签
  required, // 必选
  disabled = false, // 是否禁用
  placeholder, // 默认显示
  options, // 格式: [ { label, value, children: [循环] } ]
  cols = 1, // 多少列，只有1列的时候返回的是非数组
  onChange, // 监听变化时的回调
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const onInputChange = (value: any) => {
    const newValue = cols == 1 ? value[0] : value;
    onChange && onChange(newValue);
    form.set(prop, newValue);
  }

  const showLabel = useComputed(() => {
    if (!form.data[prop]) return null;
    const list = [];
    let parents = options;
    for (let i = 0; i < cols; i++) {
      const parent = _.find(parents, (o: any) => o.value === form.data[prop][i]);
      list.push(parent.label);
      parents = parent.children;
    }
    return list.join('');
  }, [form.data[prop]]);

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <Picker {...{ data: options, cols, onChange: onInputChange, defaultValue: cols == 1 ? [form.data[prop]] : form.data[prop] }}>
        <PickerItem {...{ disabled, label, placeholder, showLabel }}></PickerItem>
      </Picker>
    </FormLabel>
  );
};
