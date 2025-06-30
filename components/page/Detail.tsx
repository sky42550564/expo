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
  notShowCreateAlert?: boolean; // 不现实创建的弹窗
  callback?: any; // 详情页面的回调函数，会返回参数
  other?: any; // 附加属性
}>;

export default forwardRef((props: Props, ref) => {
  const { personal } = useRedux('personal'); // 全局个人信息
  const { option } = useRedux('option'); // 全局变量
  const [form] = Form.useForm();

  const pageData = props.pageData;
  const other = props.other;
  const callback = props.callback;
  const readonly = props.readonly || pageData.readonly; // 是否是只读
  const isBreakLine = props.isBreakLine || pageData.isBreakLine; // 是否是分行展示，分行展示会有序号
  const record = props.record || pageData.record;
  const noGetData = props.noGetData || pageData.noGetData;
  const noFooter = props.noFooter || pageData.noFooter;
  const detailEmptyTip = props.detailEmptyTip || pageData.detailEmptyTip;
  const initParams = props.initParams || pageData.initParams;
  const refreshList = props.refreshList || pageData.refreshList;
  const onSubmitResult = props.onSubmitResult || pageData.onSubmitResult;
  const notShowCreateAlert = props.notShowCreateAlert || pageData.notShowCreateAlert;
  const forceEditting = props.forceEditting || pageData.forceEditting;
  const hasCUD = !readonly && _.some(props.pageData.fields, (o: any) => _.get(o, 'value.type') && _.get(o, 'value.edit') !== false && _.get(o, 'value.readonly') !== true && _.get(o, 'value.arrow') !== true); // 判断是否可以有cud的操作，只要有一个字段有value.type并且不为readonly就可以编辑

  const _isModify = !!record; // 是否是修改
  // 如果是修改的情况，如果有formPreHook，返回formPreHook的修正值，否则form就是record
  let intFormData = _isModify ? _.reduce(props.pageData.fields, (r: any, o: any) => { r[o.name] = record[o.name]; return r }, {}) : _.reduce(props.pageData.fields, (r: any, o: any) => { r[o.name] = o.value?.default; return r }, {});
  if (props.pageData.formPreHook) {
    intFormData = pageData.formPreHook({ $: record, params: intFormData });
  }
  const [formData, setFormData] = useState(intFormData);
  const [isModify, setIsModify] = useState(_isModify);

  const fields = useComputed(() => _.filter(props.pageData.fields, (o: any) => utils.visible(_.ifNull(o.edit, o.value?.edit), { pageData: pageData, $: record, form: formData, initParams: props.initParams, isModify })), [props.pageData]);  // 过滤掉不显示的字段
  const title = useComputed(() => props.title || (props.pageData.label && `${isModify ? '修改' : '新增'}${props.pageData.label}`), [props.pageData, isModify]);

  const [hasEdit, setHasEdit] = useState(!readonly);// 是否有编辑的栏目
  const [editting, setEditting] = useState(props.forceEditting || (hasCUD && !record)); // 新增的时候默认为编辑状态
  const [rows, setRows] = useState([]);

  const submit = async () => {
    pageData.debug && console.log('form = ', form.getFieldsValue());
    let params;
    try {
      params = await form.validateFields();
    } catch (e) { }
    if (!params) return;
    if (initParams) { // 初始参数
      params = { ...params, ...initParams };
    }
    if (pageData.formPostHook) { // 修正form函数
      params = pageData.formPostHook({ $: record, params });
    }
    if (isModify) {
      params.id = record?.id; // 修改的时候需要传当前数据的id
      let modifyParams = pageData.params?.modify; // pageData通过{params:{ modify: ... }} 传过来的参数
      if (_.isFunction(modifyParams)) {
        params = modifyParams({ $: record, params, pageData, personal: personal.value, option: option.value, other });
        if (!params) return; // 如果返回的空值，则阻止提交，用来做参数判断等
      } else {
        params = { ...params, ...(modifyParams || {}) };
      }
    } else {  // 追加pageData的创建的初始参数
      let createParams = pageData.params?.create; // pageData通过{params:{ create: ... }} 传过来的参数
      if (_.isFunction(createParams)) {
        params = createParams({ $: record, params, pageData, personal: personal.value, option: option.value, other });
        if (!params) return; // 如果返回的空值，则阻止提交，用来做参数判断等
      } else {
        params = { ...params, ...createParams };
      }
    }
    // 处理唯一字段
    const uniq = _.filter(pageData.fields, (o: any) => o.value?.uniq).map((o: any) => o.name).join(',');
    if (uniq) {
      params['$uniq'] = uniq;
    }
    if (pageData.debug) {
      return console.log('params = ', params); // 调试提交的参数，提交的时候只打印参数，不执行提交
    }

    let data;
    if (isModify) {
      if (_.isFunction(pageData.apis?.modify)) {
        data = await pageData.apis?.modify({ $: record, params, pageData, personal: personal.value, option: option.value, other });
        if (!data || (data.confirm === true && data.cancel === false && data.errMsg === 'showModal:ok')) return; // 如果钩子函数不返回，则不再向下继续
      } else {
        const api = pageData.apis?.modify || `/modify/${pageData.table || pageData.name}`;
        data = await utils.post(api, params);
      }
    } else if (_.isFunction(pageData.apis?.create)) {
      data = await pageData.apis?.create({ params, pageData, personal: personal.value, option: option.value, other });
      if (!data || (data.confirm === true && data.cancel === false && data.errMsg === 'showModal:ok')) return; // 如果钩子函数不返回，则不再向下继续
    } else {
      const api = pageData.apis?.create || `/create/${pageData.table || pageData.name}`;
      data = await utils.post(api, params);
    }
    if (!data.success) { // 如果返回不成功
      return $alert(data.message); // 提示用户错误信息
    }
    isModify && Object.assign(record, data.result);
    // 刷新列表
    refreshList && refreshList();
    callback && callback(data.result, isModify);
    onSubmitResult && onSubmitResult(data.result, isModify);
    !notShowCreateAlert && await $alert(isModify ? (pageData.modifySuccessText || '修改成功') : (pageData.createSuccessText || '新增成功')); // 提示成功
    router.back();
  }

  useEffect(() => {
  }, []);
  // useImperativeHandle(ref, () => ({ show, close })); // 暴露函数组件内部方法

  return (
    <View>
      <Form
        form={form}
        style={{ maxWidth: sr.w }}
        initialValues={formData}
        autoComplete="off"
      >
        {fields.map((field: any) => <FormItem key={utils.uuid()} {...{ ...field, record, field, form, disabled: !editting }} />)}
      </Form>
      {
        (!noFooter && hasEdit) &&
        <View style={_u(`_fx_rc _mv_30`)}>
          {editting && <Div style={_u(`_button_160_36_r`)} onPress={submit} > {props.pageData.submitButtonText || '保存'} </Div> || <Div style={_u(`_button_160_36_r`)} onPress={submit} > 修改 </Div>}
          {editting && isModify && !forceEditting && <Div style={_u(`_button_160_36_r _bc_error_warning _c _ml_10`)} onPress={submit}> 取消 </Div>}
        </View>
      }
    </View>
  );
});
