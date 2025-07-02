import { View } from 'react-native';
import Cell from '@/components/page/Cell';

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
  formProps, // 表单属性
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const showEditPage = () => {
    if (value.disabled) return;
    if (value.click) {
      return value.click();
    }
    if (value.pagePath) {
      return router.push(value.pagePath, value.pageParams);
    }
    router.push('/pages/singleForm/index', {
      title: `设置${label}`,
      value,
      prop,
      form,
      label,
      field,
      pageData,
      record,
      formProps,
    });
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <Div s='_fx_rb _fx_1' onPress={showEditPage}>
        <Div></Div>
        <Div s='_fx_r'>
          {form[prop] === undefined && <Div s='_value'>{value.placeholder == undefined ? `请设置${label}` : value.placeholder}</Div>}
          <Cell field={field} item={form.data} pageData={pageData}></Cell>
          <Div v-if='!value.hideArrow' s='_arrow _ml_10'></Div>
          <Div v-else s='_w_19'></Div>
        </Div>
      </Div>
    </FormLabel>
  );
};
