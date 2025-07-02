export default ({
  children, // 子组件
  form, // 整个form
  prop, // 字段名
  label, // 标签
  labelLeft, // 标签的左边宽度
  labelWidth, // 标签的宽度
  labelRight, // 标签的右边宽度
  noLabel, // 不显示标签
  placeholder, // 默认显示
  style, // 样式
  unit, // 单位
}: any) => {
  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, unit }}>
      <Div style={_u(`_fx_r`)}>
        {
          children ?
            <Children fontStyle={_u(`_fs_17`, style)} children={children}></Children>
            : <Div style={_u(`_fs_17`, style)}>{form.data[prop] == undefined ? placeholder : form.data[prop]}</Div>
        }
        {unit !== undefined && <Div s='_fs_red'>{unit}</Div>}
      </Div>
    </FormLabel>
  );
};
