import { Radio } from '@ant-design/react-native';

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
  options = ['是', '否'],
  row = true, // 默认为横向, false为纵向
  style, // 样式
  onChange, // 监听变化时的回调
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const onGrouphange = (e: any) => {
    const { value } = e.target;
    const newValue = value == 0;
    onChange && onChange(newValue);
    form.set(prop, newValue);
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <Radio.Group disabled={disabled} onChange={onGrouphange} value={form.data[prop] ? 0 : 1} style={style || _u(row && `_fx_r_wrap _p_0`)}>
        {
          _.map(options, (v: any, k: number) => <Radio.RadioItem key={k} style={_u(`_bc_transparent`)} disabled={disabled} value={k}>{v}</Radio.RadioItem>)
        }
      </Radio.Group>
    </FormLabel>
  );
};
