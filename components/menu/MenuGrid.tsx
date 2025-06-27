import { View } from 'react-native';

type Props = {
  list?: any;      // 列表
  column?: number; // 横向的个数
  scroll?: boolean; // 是否滑动
  width?: any;     // 宽度
  hgap?: number;   // 列间距
  vgap?: number;   // 行间距
  backgroundColor?: string; // 背景色
};

export default ({
  list = [],
  column = 5,
  scroll = false,
  width = 375,
  hgap = 10,
  vgap = 20,
  backgroundColor = 'white',
}: Props) => {
  const showPage = (item: any) => {
    if (item.click) {
      return item.click(item);
    }
    router.push(item.page, item.passProps);
  }

  return (
    <View style={_u(`_w_${width} _fx_r_wrap  _bc_${backgroundColor} _pv_20`)}>
      {
        list.map((item: any, i: number) => (
          <Div style={_u(`_fx_ccc _mh_${Math.floor(hgap / 2)} _w_${Math.floor(width / column - hgap)}`, i >= column && `_mt_${vgap}`)} key={i} onPress={() => showPage(item)}>
            <Icon icon={item.icon} size={item.size || 24} />
            <Div style={_u(`_fs_14_gray`)}>{item.label}</Div>
          </Div>
        ))
      }
    </View>
  );
}
