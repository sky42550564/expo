import Cell from '@/components/page/crud/Cell';

// 设置value
/*
value: {
  arrow: true,
  pagePath: '/pages/personal/modifyPassword',
  click: ()=>{},
  callback: async ({ params }) => {}),
  相对应的表单的其他属性
},
*/
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
  value, // 值
  field, // 字段
  pageData, // 页面配置
  record, // 数据
  formSetting, // 表单属性
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const showEditPage = () => {
    const { disabled, click, pagePath, pageProps, callback, ...newValue } = value;
    if (disabled) return;
    if (click) {
      return click();
    }
    if (pagePath) {
      return router.push(pagePath, pageProps);
    }
    router.push('/pages/crud/singleForm', {
      title: `设置${label}`,
      formSetting,
      form,
      prop,
      label,
      value: newValue,
      field,
      record,
      pageData,
      callback,
    });
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <Div s='_fx_rb _fx_1' onPress={showEditPage}>
        <Div></Div>
        <Div s='_fx_r_ac'>
          {form.data[prop] === undefined && <Div s='_value'>{value.placeholder == undefined ? `请设置${label}` : value.placeholder}</Div>}
          <Cell field={field} item={form.data} pageData={pageData}></Cell>
          {!value.hideArrow && <Div s='_arrow _ml_10'></Div> || <Div s='_w_19'></Div>}
        </Div>
      </Div>
    </FormLabel>
  );
};
