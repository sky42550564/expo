export default ({
  form, // 整个form
  prop, // 字段名
  label, // 标签
  labelLeft, // 标签的左边宽度
  labelWidth, // 标签的宽度
  labelRight, // 标签的右边宽度
  noLabel, // 不显示标签
  disabled = false, // 是否禁用
  max = 5, // 最大分数
  size = 20, // 图标的大小
  activeColor = '#e79d40', // 激活的颜色
  inactiveColor = '#a3a3a3', // 失活的颜色
  onChange, // 监听变化时的回调
}: any) => {
  const setScore = (value: number) => {
    const newValue = value + 1;
    onChange && onChange(newValue);
    form.set(prop, newValue);
  }
  const list = useComputed(() => _.range(0, max), []);
  const value = useComputed(() => (form.data[prop] || 1) - 1, [form.data[prop]]);

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, disabled }}>
      <Div s='_fx_r_ac_1'>
        {
          list.map((o: number) => {
            return <Icon key={o} icon={`AntDesign:${o <= value ? 'star' : 'staro'}`} color={o <= value ? activeColor : inactiveColor} size={size} s='_mr_10' onPress={() => setScore(o)}></Icon>;
          })
        }
      </Div>
    </FormLabel>
  );
};
