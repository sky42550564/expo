import { DatePicker } from '@ant-design/react-native';

function PickerItem(props: any) {
  const { onPress, disabled, label, placeholder, form, prop } = props;
  return (
    <Div s='_fx_1 _h_30 _fx_rb _pr_10' onPress={onPress}>
      <Div s={`_fs_14 _ml_8px ${form.data[prop] ? `` : `_c_c0c4cc`}`}>{form.data[prop] ? form.data[prop] : (placeholder || `请选择${label}`)}</Div>
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
  onChange, // 监听变化时的回调
  type = 'week-day', // 精度  'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'week' | 'week-day'
  format, // 格式化函数，如:YYYY-MM-DD
  minDate, // 精度
  maxDate, // 精度
  filter, // 过滤可供选择的时间
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const formatTime = (time: string) => {
    const date = moment(time);
    if (type == 'yead') return date.format('YYYY');
    if (type == 'month') return date.format('YYYY-MM');
    if (type == 'day') return date.format('YYYY-MM-DD');
    if (type == 'hour') return date.format('YYYY-MM-DD HH');
    if (type == 'minute') return date.format('YYYY-MM-DD HH:mm');
    if (type == 'second') return date.format('YYYY-MM-DD HH:mm:ss');
    if (type == 'week') return `${date.format('YYYY')}年${date.week()}周`;
    if (type == 'week-day') return date.format('YYYY年MM月第d周');
    return date.format('YYYY-MM-DD HH:mm:ss');
  };

  const onInputChange = (value: any) => {
    const newValue = formatTime(value);
    onChange && onChange(newValue);
    form.set(prop, newValue);
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <DatePicker {...{ precision: type, minDate, maxDate, filter, onChange: onInputChange }}>
        <PickerItem {...{ disabled, label, placeholder, form, prop }}></PickerItem>
      </DatePicker>
    </FormLabel>
  );
};
