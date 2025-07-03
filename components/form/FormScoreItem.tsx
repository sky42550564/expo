import { Stepper } from '@ant-design/react-native';

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
  rule, // 附加的规则，可以正则，函数或者数组
  min = -9999999, // 最小值
  max = 9999999, // 最小值
  step = 1, // 最小值
  precision = 0, // 精度
  allowEmpty = false, // 是否允许内容为空
  ratio = 1, // 缩放比例
  unit, // 单位
  inputStyle, // TextInput style
  minusButtonProps, // minus 按钮 props { activeOpacity:1, underlayColor:'#ddd', children: <Text>-</Text>, delayLongPress:500 }
  plusButtonProps, // plus 按钮 props { activeOpacity:1, underlayColor:'#ddd', children: <Text>+</Text>, delayLongPress:500 }
  onChange, // 监听变化时的回调
}: any) => {
  // 验证规则
  const rules = (rule ? (_.isArray(rule) ? rule : [rule]) : []).map((o: any) => ({ // 验证规则
    validator: (rule: any, value: any, callback: any) => {
      if (_.isRegExp(o)) {
        if (!o.test(value)) {
          return callback(`请输入正确的${label}`); // 验证失败
        }
      } else {
        const ret = o({ v: value, $: form });
        if (ret) {
          return callback(ret); // 验证失败
        }
      }
      return callback(); // 验证成功
    }
  }));
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const onInputChange = (value: any) => {
    const realValue = value / ratio;
    onChange && onChange(realValue);
    form.set(prop, realValue);
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled, unit }}>
      <Stepper
        placeholder={placeholder || `请填写${label}`}
        disabled={disabled}
        allowEmpty={allowEmpty}
        min={min}
        max={max}
        step={step}
        digits={precision}
        minusButtonProps={minusButtonProps}
        plusButtonProps={plusButtonProps}
        inputStyle={inputStyle}
        value={(form.data[prop] || 0) * ratio}
        onChange={onInputChange}
      />
    </FormLabel>
  );
};
