import { Checkbox } from '@ant-design/react-native';

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
  options, // 默认是数组，如: ['汉族', '苗族']：值为：0，1；也可以为集合：[{ id: 1, name: '汉族' }]
  valueKey, // 获取的字段，默认为数字下标 ([0,1])，$s: 字符串下标(['0','1'])，$: 直接使用label为值 如: ['汉族', '苗族']：值为：汉族，苗族，'，如果[{ id: 1, name: '汉族' }]，可设置为id
  labelKey, // 显示的字段，默认为数组的一项，如'汉族'，如果[{ id: 1, name: '汉族' }]，可设置为name
  row = true, // 默认为横向, false为纵向
  style, // 样式
  onChange, // 监听变化时的回调
  model = [], // 双向绑定， [value, setValue] 例如：<FormImageItem label='头像' model={[head, setHead]} />
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }
  const [checkedList, setCheckedList] = useState(new Set(form.data[prop] || []));

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

  const onItemChange = (value: any, e: any) => {
    if (e.target.checked) {
      checkedList.add(value);
    } else {
      checkedList.delete(value);
    }
    const list = [...checkedList];
    setCheckedList(new Set(list));
    onChange && onChange(list);
    form.set(prop, list);
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <Div style={style || _u(row && `_fx_r_wrap _p_0`)}>
        {
          _.map(options, (v: any, k: number) => <Checkbox.CheckboxItem key={k} disabled={disabled} onChange={onItemChange.bind(null, getValue(v, k))} checked={[...checkedList].includes(getValue(v, k))}>{(labelKey ? v[labelKey] : v) + ''}</Checkbox.CheckboxItem>)
        }
      </Div>
    </FormLabel>
  );
};
