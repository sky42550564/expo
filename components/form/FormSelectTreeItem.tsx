import SelectTree from './panel/SelectTree';

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
  table, // 数据表
  parents = { parentId: { parentField: 'id', initValue: null } }, // 父级搜索参数，默认为：{ parentId: { parentField: 'id', initValue: null } }
  dependParams, // 选择的时候的附加参数，会生成附加参数在form里面
  onChange, // 监听变化时的回调
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: placeholder || `请选择${label}` });
  }

  const selectTreeRef = useRef(null);
  const [valueLabel, setValueLabel] = useState('');
  const value = useComputed(() => form.data[prop], [form.data[prop]]);

  const selectTarget = () => {
    if (disabled) return;
    selectTreeRef.current.show();
  }
  const onSelect = (targetList: any) => {
    const item = _.last(targetList);
    const val = item?.id;
    onChange && onChange(val);
    form.set(prop, val);
    setValueLabel(item?.name);

    if (dependParams) { // 如果有附加参数，设置附加参数，比如要获取的时id，同时需要获取parentId的时候就使用附加参数
      for (const param of dependParams) {
        if (_.isFunction(param.valueKey)) {
          form.set(param.name, param.valueKey(item));
        } else {
          form.set(param.name, _.get(item, param.valueKey));
        }
      }
    }
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <Div s='_fx_1 _h_30 _fx_rb' onPress={selectTarget}>
        <Div s={`_fs_14 _ml_8px ${value ? `` : `_c_c0c4cc`}`}>{value ? valueLabel : (placeholder || `请选择${label}`)}</Div>
        {!disabled && <Div s='_arrow'></Div>}
      </Div>
      <SelectTree ref={selectTreeRef} {...{ initValue: value, table, parents, anySelect, setValueLabel, onSelect }}></SelectTree>
    </FormLabel>
  );
};
