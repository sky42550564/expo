import type { PropsWithChildren } from 'react';
import React from 'react';
import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { FlatList, View, Text, ActivityIndicator, TextInput } from 'react-native';
import { Button, Form, Input } from '@ant-design/react-native';

type Props = PropsWithChildren<{
  title?: any; // 标题
  pageData?: any; // 选择模式下对应的页面配置
  record?: any; // 修改的数据
  noGetData?: any; // 不需要获取初始数据
  initParams?: any; // 初始的数据
  refreshList?: any; // 刷新列表接口
  onSubmitResult?: any; // 提交数据的回调
  forceEditting?: boolean; // 强制为编辑状态，直接进行提交
  noFooter?: boolean; // 隐藏底部按钮
  detailEmptyTip?: any; // 没有filed的时候显示的提示文字
  readonly?: boolean; // 是否是只读
  isBreakLine?: boolean; // 是否是分行展示
  callback?: any; // 详情页面的回调函数，会返回参数
  other?: any; // 附加属性
}>;

export default forwardRef((props: Props, ref) => {
console.log('=================props', props);
  const { personal } = useRedux('personal'); // 全局个人信息
  const { option } = useRedux('option'); // 全局变量
  const [form] = Form.useForm();


  const _isModify = !!props.record; // 是否是修改
  // 如果是修改的情况，如果有formPreHook，返回formPreHook的修正值，否则form就是record
  let intFormData = _isModify ? _.reduce(props.pageData.fields, (r: any, o: any) => { r[o.name] = props.record[o.name]; return r }, {}) : _.reduce(props.pageData.fields, (r: any, o: any) => { r[o.name] = o.value?.default; return r }, {});
  if (props.pageData.formPreHook) {
    intFormData = props.pageData.formPreHook({ $: props.record, params: intFormData });
  }
  const [formData, setFormData] = useState(intFormData);
  const [isModify, setIsModify] = useState(_isModify);

  const fields = useComputed(() => _.filter(props.pageData.fields, (o: any) => utils.visible(_.ifNull(o.edit, o.value?.edit), { pageData: props.pageData, $: props.record, form: formData, initParams: props.initParams, isModify })), [props.pageData]);  // 过滤掉不显示的字段

  const title = useComputed(() => props.title || (props.pageData.label && `${isModify ? '修改' : '新增'}${props.pageData.label}`), [props.pageData, isModify]);



  const [hasEdit, setHasEdit] = useState(false);
  const [editting, setEditting] = useState(false);
  const [rows, setRows] = useState([]);

  const submit = () => { // 

  }

  useEffect(() => {
  }, []);
  // useImperativeHandle(ref, () => ({ show, close })); // 暴露函数组件内部方法

  return (
    <View>
      <Form
        form={form}
        style={{ maxWidth: sr.w }}
        initialValues={{}}
        autoComplete="off"
      >
        {fields.map((field: any) => <FormItem key={utils.uuid()} {...{ ...field, field, form, disabled: !editting }} />)}
      </Form>
      {
        (!props.noFooter && hasEdit) &&
        <View style={_u(`_fx_rc _mv_30`)}>
          {editting && <Div style={_u(`_button_160_36_r`)} onPress={submit} > {props.pageData.submitButtonText || '保存'} </Div> || <Div style={_u(`_button_160_36_r`)} onPress={submit} > 修改 </Div>}
          {editting && isModify && !props.forceEditting && <Div style={_u(`_button_160_36_r _bc_error_warning _c _ml_10`)} onPress={submit}> 取消 </Div>}
        </View>
      }
    </View>
  );
});
