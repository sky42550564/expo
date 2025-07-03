import { Slider } from '@ant-design/react-native';

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
  rule, // 附加的规则，可以正则，函数或者数组
  min = 0, // 最小值
  max = 100, // 最小值
  disabledStep = false, // 是否禁用步距；禁用后onChange将返回带有小数点的值
  step = 1, // 步距，取值必须大于 0，并且 (max - min) 可被 step 整除。当 marks 不为空对象时，step 的配置失效
  ticks = true, // 是否显示刻度
  range, //	是否为双滑块
  marks, //	刻度标记
  ratio = 1, // 缩放比例
  unit, // 单位
  style, // 最外层容器样式
  styles, // 语义化结构 style
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

  const defaultValue = useComputed(() => {
    return range ? _.map(form.data[prop] || [0, 100], (o: number, i: number) => ((o === undefined ? (i == 0 ? 0 : 100) : o) * ratio)) : (form.data[prop] || 0) * ratio;
  }, []);

  const newMarks = useComputed(() => marks || { [min]: min, [max]: max }, []);

  const onSliderChange = (value: any) => {
    const realValue = range ? _.map(value, (o: number) => (o / ratio)) : value / ratio;
    onChange && onChange(realValue);
    form.set(prop, realValue);
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled, unit }}>
      <Div s='_fx_1 _display_block'>
        <Slider {...{ disabled, min, max, disabledStep, step, ticks, style, styles, range, marks: newMarks, onChange: onSliderChange, defaultValue }} />
      </Div>
    </FormLabel>
  );
};
