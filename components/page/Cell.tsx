import EditCell from './EditCell';
import FileLabel from './FileLabel';

type Props = {
  fieldName?: any, // 字段名称
  field?: any, // 字段（如果没有传field，通过fieldName去获取field）
  item?: any, // 对应表格的整行数据
  pageData?: any, // 页面配置
  readonly?: boolean, // 主要是用于detail的只读模式下显示Cel
  ontableParams?: any, // ontable的参数
  ontableSubmit?: any, // ontable的提交函数
};

export default (props: Props) => {
  const { personal } = useRedux('personal'); // 全局个人信息
  const { option } = useRedux('option'); // 全局变量
  const { item, field, pageData } = props;

  const currentField = useComputed(() => {
    return props.field ?? _.find(props.pageData.fields, (o: any) => o.name === props.fieldName);
  }, [props]);

  const r = useComputed(() => {
    const { type: fieldType, show, value, name, previewList, thumb } = currentField;
    if (currentField.expandTable) { // 用来展示表格的几行内容，这是一个展示组件
      return {
        type: 'expandTable',
        list: _.isFunction(currentField.expandTable.list) ? currentField.expandTable.list({ $: props.item }) : currentField.expandTable.list,
        fields: currentField.expandTable.fields,
      };
    }
    let propsValue = props.item[name];
    if (value?.type === 'number' && value?.ratio !== undefined && propsValue) {
      propsValue = propsValue / value.ratio;
    }
    if (show) { // 如果有show，则安装show的方法显示
      propsValue = show({ v: props.item[name], $: props.item, pageData: props.pageData, personal, option });
    }
    const type = fieldType || value?.type;
    if (propsValue?.render) {
      return { value: propsValue };
    }
    if (value?.ontable) { // 在table中编辑
      return {
        ontable: value.ontable,
        ontableSubmit: value.ontableSubmit,
        ontableParams: value.ontableParams,
        style: '_fx_rc',
        type,
        value: propsValue,
      };
    }
    if (type === 'true') {
      return {
        type: 'true',
        value: (value.options || ['是', '否'])[propsValue ? 0 : 1],
      };
    }
    if (type === 'date') {
      return {
        type: 'date',
        value: propsValue?.slice(0, 10), // 只显示日期
      };
    }
    if (type === 'head') {
      return {
        type: 'head',
        value: propsValue,
        name: _.get(props.item, value?.nameKey || 'name'),
      };
    }
    if (type === 'Img' || type === 'picture') {
      return {
        type: 'Img',
        value: utils._thumb(propsValue, thumb),
        previewList: previewList && _.isFunction(previewList) ? previewList({ v: propsValue, $: props.item, pageData: props.pageData, personal, option }) : (previewList || [propsValue]),
        style: _u(value.width && value.height ? `_s_${value.width}_${value.height}` : value.width ? `_w_${value.width}` : value.height ? `_h_${value.height}` : ``),
        mode: value.mode || (value.width && value.height ? `stretch` : value.width ? `width` : value.height ? `height` : `cover`),
      };
    }
    if (type === 'images') {
      return {
        type: 'images',
        value: utils._thumb(propsValue[0], thumb),
        previewList: previewList && _.isFunction(previewList) ? previewList({ v: propsValue, $: props.item, pageData: props.pageData, personal, option }) : (previewList || propsValue),
        style: _u(value.width && value.height ? `_s_${value.width}_${value.height}` : value.width ? `_w_${value.width}` : value.height ? `_h_${value.height}` : ``),
        mode: value.mode || (value.width && value.height ? `stretch` : value.width ? `width` : value.height ? `height` : `cover`),
      };
    }
    if (type === 'imageText') {
      return {
        type: 'imageText',
        value: propsValue,
        thumb: utils._thumb(_.find(propsValue, o => o.url)?.url, thumb),
        previewList: previewList && _.isFunction(previewList) ? previewList({ v: propsValue, $: props.item, pageData: props.pageData, personal, option }) : (previewList || _.filter(propsValue, o => o.url).map(o => o.url)),
      }
    }
    if (type === 'radio' || type === 'select') {
      if (_.get(value.options, '0.label')) { // 保持排序有value的情况 options: [{ label: '是', value: 1 }, { label: '否', value: 1 }]
        return { value: _.get(_.find(value.options, o => o == propsValue), 'label') };
      }
      if (value.labelType == 2) { // 直接显示值的情况
        return { value: propsValue };
      }
      return { value: _.get(value.options, propsValue) };
    }
    if (type === 'checkbox') {
      if (_.get(value.options, '0.label')) { // 保持排序有value的情况 options: [{ label: '是', value: 1 }, { label: '否', value: 1 }]
        return { value: _.values(_.mapValues(propsValue, v => _.get(_.find(value.options, o => o == v), 'label'))).join(', ') };
      }
      if (value.labelType == 2) { // 直接显示值的情况
        return { value: _.join(propsValue, ', ') };
      }
      return { value: _.values(_.mapValues(propsValue, o => value.options[o])).join(', ') };
    }
    if (type === 'file') {
      return {
        type,
        value: _.isArray(propsValue) ? propsValue : propsValue ? [propsValue] : [],
      }
    }

    return { type, value: propsValue, unit: value?.unit };
  }, [props]);

  const colorStyle = useComputed(() => {
    const { name, color } = currentField;
    if (!color) {
      return {};
    }
    if (_.isString(color)) {
      return { color };
    }
    return { color: color({ v: props.item[name], $: props.item, pageData: props.pageData, personal, option }) };
  }, [props, currentField]);

  const renderItem = () => {
    if (r?.comonent) {
      return r.comonent({ item, field, pageData });
    }
    if (['head'].includes(r.type)) {
      return <UserHead user={{ head: r, name: r.name }} />;
    }
    if (['images', 'images'].includes(r.type)) {
      return <Img url={r} style={r.style} mode={r.mode} onPress={() => utils.previewImage(r.previewList)}></Img>
    };
    if ('file' == r.type) {
      return _.map(r, (item: any, i: any) => <FileLabel key={i} name={item.name} url={item.url} />);
    }
    if ('money' == r.type) {
      return <Div>￥{utils._money(r)}</Div>
    }
    if ('expandTable' == r.type) {
      return (
        <Div s='_value'>共 {r.list.length} 项</Div>
      )
    }
    if (r.ontable && r.ontable != 'edit' && !props.readonly) {
      return <EditCell value={r} field={field} record={item} pageData={pageData} ontable={r.ontable} ontableSubmit={r.ontableSubmit} ontableParams={r.ontableParams}></EditCell>;
    }
    return <Div s={['_value', colorStyle]}>{r.value}{r.unit || ''}</Div>;
  }

  const showTableListPage = ({ label, list, fields }: any) => { // 显示展示列表组件
    router.push('/components/page/crud/index', {
      title: label,
      pageData: {
        readonly: true,
        label,
        mobile: { hideTop: true, hasArrow: true },
        fields,
        list,
      },
    });
  }

  const handleOntableModify = () => { // onTable的编辑
    router.push('/components/page/singleForm/index', {
      title: `修改${currentField.label}`,
      value: currentField,
      prop: currentField.name,
      form: props.item,
      label: currentField.label,
      callback: async ({ params }: any) => {
        // 如果是修改的时候，url和data不一样
        const url = props.pageData.apis?.modify || `/modify/${props.pageData.table || props.pageData.name}`;
        params = { ...params, id: props.item.id }; // 使用扩展符生成一个新的对象
        if (_.isFunction(props.ontableParams)) {
          params = props.ontableParams({ params, $: props.item, pageData: props.pageData, personal });
        } else if (props.ontableParams) {
          params = { ...params, ...props.ontableParams };
        }
        // return console.log('params = ', params);
        let data;
        if (_.isFunction(props.ontableSubmit)) {
          data = await props.ontableSubmit({ params, $: props.item, pageData: props.pageData, personal, page: props.page });
          if (!data) return; // 如果钩子函数不返回，则不再向下继续
        } else {
          data = await utils.post(url, params);
        }
        if (!data.success) { // 如果返回不成功
          return $alert(data.message); // 提示用户错误信息
        }
        return data;
      },
    });
  }

  return (
    r ? (
      <Div s="_fx_r">
        {renderItem()}
        {r.ontable == 'edit' && <Icon icon="FontAwesome6:edit" size={18} s="_ml_20" onPress={() => handleOntableModify()} />}
      </Div >
    ) : null
  );
}
