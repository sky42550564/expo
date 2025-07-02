export default Page(({
  formSetting, // 表单的配置
  form, // 总表单
  prop, // 属性名
  label, // 标签
  value, // 表单值
  field, // 表单项
  record, // 记录值
  pageData, // 页面配置
  callback, // 提交的回调
}: any) => {
  const singleForm = useForm({ [prop]: record?.[prop] }, formSetting);

  const submit = async () => {
    if (!singleForm.validate()) return;
    const params = { [prop]: singleForm.data[prop], id: record?.id };
    // return console.log('params = ', params);
    const data = await callback({ params, form, record, pageData });
    if (data !== true) { // 如果返回为true，则不再处理结果
      if (!data.success) { // 如果返回不成功
        return $alert(data.message); // 提示用户错误信息
      }
      form.set(prop, singleForm.data[prop]);
      await $alert('设置成功'); // 提示成功
      router.back();
    }
  }

  return (
    <>
      <Div s='_h_20'></Div>
      <FormItem {...{ label, prop, value, field, form: singleForm }} />
      <Div onPress={submit} s='_button_200_36_fs14_r _of_hidden _mt_50 _self_ac'>保存</Div>
    </>
  );
})
