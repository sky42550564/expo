import SelectRegion from './panel/SelectRegion';

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
  anySelect = false, // 默认为只有叶子节点才可以选择
  leafLevels = [10], // 叶子节点对应的级别，0:直辖市, 1:有县的直辖市（重庆）, 2:省、自治区, 3:省、自治区下地级市, 4:直辖市的市辖区, 5:地级市的市辖区, 6:直辖市的县, 7:地级市的县, 8:直辖市的区, 9:地级市的区, 10:镇/街道, 100:兵团,
  onChange, // 监听变化时的回调
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const selectRegionRef = useRef(null);

  const value = useComputed(() => form.data[prop], [form.data[prop]]);

  const selectAddress = () => {
    if (disabled) return;
    selectRegionRef.current.show();
  }
  const onSelect = (addressList: any) => {
    const value = _.map(addressList, 'name');
    onChange && onChange(value);
    form.set(prop, value);
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <Div s='_fx_1 _h_30 _fx_rb' onPress={selectAddress}>
        <Div s={`_fs_14 _ml_8px ${value?.length ? `` : `_c_c0c4cc`}`}>{value?.length ? value?.join('/') : (placeholder || `请选择${label}`)}</Div>
        {!disabled && <Div s='_arrow'></Div>}
      </Div>
      <SelectRegion ref={selectRegionRef} {...{ initValue: value, anySelect, leafLevels, onSelect }}></SelectRegion>
    </FormLabel>
  );
};
