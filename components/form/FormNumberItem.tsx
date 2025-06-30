import { View } from 'react-native';
import { Form, Stepper } from '@ant-design/react-native';

const NumberInput = (props: any) => {
  const {
    label, // 标签
    placeholder, // 默认显示
    disabled = false, // 是否禁用
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
    value, // antd的Form.Item自动传下来的值
    onChange, // antd的Form.Item自动传下来的回调
  } = props;
  const onInputChange = (value: any) => {
    onChange && onChange(value)
  }
  return (
    <View style={_u(`_fx_r_ac`)}>
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
        defaultValue={value}
        onChange={onInputChange}
      />
      <Div s='_fs_14_red _ml_10'>{unit}</Div>
    </View>
  )
}

export default ({
  form, // 整个form
  label, // 标签
  name, // 字段名
  noLabel, // 不显示标签
  placeholder, // 默认显示
  required, // 必选
  rule, // 附加的规则，可以正则，函数或者数组
  disabled = false, // 是否禁用
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
  model = [], // 双向绑定， [value, setValue] 例如：<FormNumberItem label='年龄' model={[age, setAge]} />
}: any) => {
  // 验证规则
  const rules = (rule ? (_.isArray(rule) ? rule : [rule]) : []).map((o: any) => ({ // 验证规则
    validator: (rule: any, value: any) => {
      if (_.isRegExp(o)) {
        if (!o.test(value)) {
          return Promise.reject(new Error(`请输入正确的${label}`)); // 验证失败
        }
      } else {
        const ret = o({ v: value, $: form });
        if (ret) {
          return Promise.reject(new Error(ret)); // 验证失败
        }
      }
      return Promise.resolve(); // 验证成功
    }
  }));
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }
  return (
    <Form.Item
      label={noLabel ? null : label}
      name={name}
      rules={rules}
    >
      <NumberInput
        placeholder={placeholder || `请填写${label}`}
        disabled={disabled}
        allowEmpty={allowEmpty}
        unit={unit}
        min={min}
        max={max}
        step={step}
        digits={precision}
        minusButtonProps={minusButtonProps}
        plusButtonProps={plusButtonProps}
        inputStyle={inputStyle}
        value={model[0]}
        onChange={model[1] || onChange}
      />
    </Form.Item>
  );
};
