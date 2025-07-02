import Cell from './Cell';
type Props = {
  item?: any, // 对应表格的整行数据
  pageData?: any, // 页面配置
  page?: any, // 页面方法
};

export default (props: Props) => {
  const { personal } = useRedux('personal'); // 全局个人信息
  const { option } = useRedux('option'); // 全局变量

  const rows = useComputed(() => {
    let list = _.reject(props.pageData.fields, (o: any) => o.list?.image) // 去除显示的图片字段
    list = _.filter(list, (o: any) => utils.visible(o.visible, { v: props.item[o.name], $: props.item, pageData: props.pageData, personal, option })); // 过滤掉不显示的字段
    // 处理不断行的情况，如果一个filed
    let _rows = [], row = [], n = list.length;
    for (let i = 0; i < n; i++) {
      const field = list[i];
      row.push(field);
      if (!list[i + 1]?.listFollow) {
        _rows.push(row);
        row = [];
      }
    }
    row.length && _rows.push(row);
    return _rows;
  }, [props]);

  const labelStyle = useComputed(() => {
    const labelWidth = _.get(props.pageData, 'labelWidth');
    return labelWidth ? `width:${labelWidth}px;` : {};
  }, [props.pageData]);

  const image = useComputed(() => { // 获取栏目头显示的图片的src
    const field = _.find(props.pageData.fields, (o: any) => o.list?.image);
    if (!field) {
      return null;
    }
    const value = _.get(props.item, field.alias || field.name);
    return {
      src: !field.show ? value : field.show({ v: value, $: props.item, pageData: props.pageData }),
      style: field.list?.style || (field.type === 'head' ? _u(`_s_40`) : _u(`_s_60`)),
      click: !field.list.click ? undefined : () => field.list.click({ $: props.item, pageData: props.pageData }),
    }
  }, [props]);

  return (
    <Div s='_mv_10 _fx_r_1' onPress={() => props.page.showDetail(props.item)}>
      {image && <Img url={image.src} style={_u(`_self_ac _mr_6`, image.style)} onPress={image.click}></Img>}
      <Div s='_fx_c_1'>
        {
          _.map(rows, (row: any, i: any) => (
            <Div key={i} s='_fx_r _mv_4'>
              {
                _.map(row, (field: any, j: any) => (
                  <Div key={j} s={`_fx_r _w_${100 / row.length}%`}>
                    {(!field.noLabel && field.label) && <Div style={_u(`_label _nowrap`, labelStyle)}>{field.label}</Div>}
                    <Cell field={field} item={props.item} pageData={props.pageData}></Cell>
                  </Div>
                ))
              }
            </Div>
          ))
        }
      </Div>
    </Div>
  );
}
