import type { PropsWithChildren } from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { View } from 'react-native';
import { Form } from '@ant-design/react-native';
import Cell from './Cell';

type Props = PropsWithChildren<{
  pageData?: any; // 选择模式下对应的页面配置
  record?: any; // 修改的数据
  noGetData?: any; // 不需要获取初始数据
  initParams?: any; // 初始的数据
  params?: any; // 搜索参数
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

export default forwardRef((props: Props, ref: any) => {
  const { personal } = useRedux('personal'); // 全局个人信息
  const { option } = useRedux('option'); // 全局变量

  const pageData = props.pageData || {};
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
  const hasCUD = !readonly && _.some(pageData.fields, (o: any) => _.get(o, 'value.type') && _.get(o, 'value.edit') !== false && _.get(o, 'value.readonly') !== true && _.get(o, 'value.arrow') !== true); // 判断是否可以有cud的操作，只要有一个字段有value.type并且不为readonly就可以编辑

  const _isModify = !!record; // 是否是修改
  // 如果是修改的情况，如果有formPreHook，返回formPreHook的修正值，否则form就是record
  let intFormData = _isModify ? _.reduce(pageData.fields, (r: any, o: any) => { r[o.name] = record[o.name]; return r }, {}) : _.reduce(pageData.fields, (r: any, o: any) => { r[o.name] = o.value?.default; return r }, {});
  if (pageData.formPreHook) {
    intFormData = pageData.formPreHook({ $: record, params: intFormData });
  }
  const form = useForm(intFormData);
  const [isModify, setIsModify] = useState(_isModify);

  const fields = useComputed(() => _.filter(pageData.fields, (o: any) => utils.visible(_.ifNull(o.edit, o.value?.edit), { pageData: pageData, $: record, initParams: props.initParams, isModify })), [pageData]);  // 过滤掉不显示的字段
  const opers = useComputed(() => _.filter(pageData.detailOpers, (o: any) => utils.visible(o.visible, { pageData, $: record, initParams, isModify })));  // 过滤掉不显示的按钮

  const labelWidth = useComputed(() => {
    const labelWidth = _.get(pageData, 'labelWidth');
    if (labelWidth) {
      return labelWidth;
    }
    const length = _.maxValue(fields.value, 'label.length');
    const width = pageData.labelWidth || [60, 70, 80, 90, 100, 106, 110][length] || 80;
    return width;
  });

  const [hasEdit, setHasEdit] = useState(!readonly);// 是否有编辑的栏目
  const [editting, setEditting] = useState(props.forceEditting || (hasCUD && !record)); // 新增的时候默认为编辑状态
  const getRows = (list: any) => {
    // 处理不断行的情况，如果一个filed
    let _rows = [], row = [], n = list.length;
    for (let i = 0; i < n; i++) {
      const field = list[i];
      row.push(field);
      if (!list[i + 1]?.follow) {
        _rows.push(row);
        row = [];
      }
    }
    row.length && _rows.push(row);
    return _rows;
  }
  const tabs = useComputed(() => { // 是否是tab模式
    if (_.find(fields, (o: any) => o.tab)) {
      return _.map(_.groupBy(fields, (o: any) => o.tab), (v: any, k: any) => ({ label: k, rows: getRows(v) }));
    }
    return null;
  });
  const rows = useComputed(() => getRows(fields));

  const checkFrom = async () => { // 验证表单并返回表单数据
    pageData.debug && console.log('form = ', form.data);
    if (!form.validate()) return;
    const params = { ...form.data };
    return params;
  }

  // 获取初始数据
  const getData = async () => {
    form.setAll({});
    setHasEdit(false);
    const lookup = _.filter(pageData.fields, (o: any) => _.get(o, 'value.table')).reduce((r: any, o: any) => ({ ...r, [o.name]: o.value.table }), {});
    let params = {
      ...(props.params || {}), // 搜索参数，组合初始参数
      $lookup: _.size(lookup) ? lookup : undefined, // 关联表
    };
    let detailParams = pageData.params?.detail; // pageData通过{params:{ detail: ... }} 传过来的参数
    if (_.isFunction(detailParams)) {
      params = detailParams({ params, pageData, personal, option, other });
      if (!params) return; // 如果返回的空值，则阻止提交，用来做参数判断等
    } else {
      params = { ...params, ...(detailParams || {}) };
    }
    // return console.log('params = ', params);
    let data: any = {};
    if (!pageData.onlyCreate && _.size(params)) {
      if (_.isFunction(pageData.apis?.detail)) {
        data = await pageData.apis.detail({ params, personal, option, other });
      } else {
        const api = pageData.apis?.detail || `/detail/${pageData.table || pageData.name}`;
        data = await utils.post(api, params);
      }
    }
    if (data.success) { // 如果服务器返回成功
      const form: any = {};
      form.id = data.result.id;
      for (const field of pageData.fields) {
        if (field.name) {
          let v = _.get(data.result, field.name);
          form[field.name] = v === undefined ? field.value?.default : v;
          // 只读属性：pageData.readonly 或者 field没有type 或者 field.readonly
          if (!readonly && field.value && !field.value.readonly && field.value.type) {
            setHasEdit(true);
          }
        }
      }
      form.setAll(form);
    } else { // 如果没有这条数据,则为新增
      form.setAll({});
      for (const field of pageData.fields) {
        if (field.name) {
          // 只读属性：pageData.readonly 或者 field没有type 或者 field.readonly
          if (!readonly && field.value && !field.value.readonly && field.value.type) {
            setHasEdit(true);
          }
        }
      }
      setIsModify(false);
      setEditting(true);
    }
  }

  const submit = async () => {
    pageData.debug && console.log('form = ', form.data);
    if (!form.validate()) return;
    let params = { ...form.data };
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
        params = modifyParams({ $: record, params, pageData, personal, option, other });
        if (!params) return; // 如果返回的空值，则阻止提交，用来做参数判断等
      } else {
        params = { ...params, ...(modifyParams || {}) };
      }
    } else {  // 追加pageData的创建的初始参数
      let createParams = pageData.params?.create; // pageData通过{params:{ create: ... }} 传过来的参数
      if (_.isFunction(createParams)) {
        params = createParams({ $: record, params, pageData, personal, option, other });
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
        data = await pageData.apis?.modify({ $: record, params, pageData, personal, option, other });
        if (!data || (data.confirm === true && data.cancel === false && data.errMsg === 'showModal:ok')) return; // 如果钩子函数不返回，则不再向下继续
      } else {
        const api = pageData.apis?.modify || `/modify/${pageData.table || pageData.name}`;
        data = await utils.post(api, params);
      }
    } else if (_.isFunction(pageData.apis?.create)) {
      data = await pageData.apis?.create({ params, pageData, personal, option, other });
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

  const renderFromItem = ({ field }: any) => { // 显示formItem
    // 标签：没有name
    if (!field.name) {
      return (
        <Div s={['_fx_r _mt_10', field.labelBackStyle]}>
          <Div s={['_fs_14_bold', field.labelStyle]}>{field.label}</Div>
        </Div>
      )
    }
    // 只读属性的情况直接使用Cell显示
    if (readonly || field.value?.readonly) {
      return (
        <FormPlainItem label={field.label} labelWidth={labelWidth}>
          <Cell field={field} item={record} pageData={pageData}></Cell>
        </FormPlainItem>
      )
    }
    //点击进入箭头单独编辑
    if (field.value?.arrow) {
      return (
        null
        // <FormArrowItem label={field.label} labelWidth={labelWidth} prop={field.name} value={field.value} record={record} field={field} form={form} disabled={!editting} pageData={pageData} />
      )
    }
    // return <FormItem key={utils.uuid()} label={field.label} labelWidth={labelWidth} prop={field.name} value={field.value} record={record} field={field} form={form} disabled={!editting} />
  }

  useEffect(() => {
    if (!record && !noGetData) getData();
  }, []);

  useImperativeHandle(ref, () => ({ submit, checkFrom })); // 暴露函数组件内部方法
  return (
    <View>
      {
        hasEdit && _.map(rows, (row: any, i: any) => (
          <Div key={i} s='_fx_r'>
            {
              _.map(row, (field: any, j: any) => (
                <Div key={j} s={`_w_${100 / row.length}%`}>
                  {renderFromItem({ field })}
                </Div>
              ))
            }
          </Div>
        ))
      }
      {
        (!noFooter && hasEdit) &&
        <Div s='_fx_rc _mv_30'>
          {editting && <Div s='_button_160_36_r' onPress={submit}>{pageData.submitButtonText || '保存'} </Div> || <Div s='_button_160_36_r' onPress={() => setEditting(true)}>修改</Div>}
          {editting && isModify && !forceEditting && <Div s='_button_white_error_warning_160_36_r _ml_10' onPress={() => setEditting(false)}>取消</Div>}
        </Div>
      }
    </View>
  );
});
