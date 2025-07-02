type Props = {
  value?: any, // 单元的值
  field?: any, // pageData对应的域
  record?: any, // 对应的一行的值
  pageData?: any, // 页面配置
  ontable?: any, // ontable变量
  ontableSubmit?: any, // ontable的提交函数
  ontableParams?: any, // ontable的参数修正
  page?: any, // 页面方法
};

export default (props: Props) => {
  const { personal } = useRedux('personal'); // 全局个人信息
  const { option } = useRedux('option'); // 全局变量

  const form = useForm({
    [props.field.name]: props.record[props.field.name] // 新建的时候设置默认值
  });
  const buttonVisible = useComputed(() => props.ontable == 'edit' || (props.ontable !== 'change' && form.data[props.field.name] !== props.value), [props]); // 按钮是否显示

  const submit = async () => { // 提交
    // 提交之前先验证表单
    if (!form.validate()) return;
    let params = { ...form.data };
    // 如果是修改的时候，url和data不一样
    const url = props.pageData.apis?.modify || `/modify/${props.pageData.table || props.pageData.name}`;
    params.id = props.record.id; // 修改的时候需要传当前数据的id
    if (_.isFunction(props.ontableParams)) {
      params = props.ontableParams({ params, $: props.record, pageData: props.pageData, personal });
    } else if (props.ontableParams) {
      params = { ...params, ...props.ontableParams };
    }
    // return console.log('params = ', params);
    let data;
    if (_.isFunction(props.ontableSubmit)) {
      data = await props.ontableSubmit({ params, record: props.record, pageData: props.pageData, personal, page: props.page });
      if (!data) return; // 如果钩子函数不返回，则不再向下继续
    } else {
      data = await utils.post(url, params);
    }
    if (!data.success) { // 如果返回不成功
      return $alert(data.message); // 提示用户错误信息
    }
    $success(props.pageData.modifySuccessText || '修改成功'); // 提示成功
    props.record[props.field.name] = params[props.field.name];
  }

  return (
    <Div>
      <FormItem key={utils.uuid()} {...{ noLabel: true, label: props.field.label, value: props.field.value, record: props.record, field: props.field, form, required: false }} />
      {buttonVisible && <Div onPress={submit} s='_button_80_22_fs14_r6_b _of_hidden'>确定</Div>}
    </Div>
  );
}
