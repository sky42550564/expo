import { Switch } from '@ant-design/react-native';

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
  text, // 显示的文字内容
  checkedChildren, // 选中时的内容
  unCheckedChildren, // 非选中时的内容
  color, // 开关打开后的颜色
  onChange, // 监听变化时的回调
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const onGrouphange = (value: boolean) => {
    const newValue = value == true;
    onChange && onChange(newValue);
    form.set(prop, newValue);
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <Div s='_fx_1_rb _pr_10'>
        <Div>{text}</Div>
        <Switch
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
          color={color}
          disabled={disabled}
          onChange={onGrouphange}
          checked={form.data[prop] === true}
        />
      </Div>
    </FormLabel>
  );
};
