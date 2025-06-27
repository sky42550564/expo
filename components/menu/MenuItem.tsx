import { View } from 'react-native';

type Props = {
  list?: any;      // 列表
  color?: string;   // 颜色
  gap?: number; // 间距
  line?: boolean; // 是否有分隔线
};

export default ({
  list = [],
  color = 'gray',
  gap = 20,
  line = true,
}: Props) => {
  const showPage = (item: any) => {
    if (item.click) {
      return item.click(item);
    }
    router.push(item.page, item.passProps);
  }

  return (
    <View>
      {list.map((item: any, i: number) => (
        <Div key={i} style={_u(`_fx_rb _ph_10_14 _pv_${gap}`, line && `_bob`)} onPress={() => showPage(item)}>
          <View style={_u(`_fx_r`)}>
            {item.icon && <Icon icon={item.icon} size={24} />}
            {/* 标题 */}
            <Div style={_u(`_fs_14_${color} _ml_10`)}>{item.label}</Div>
          </View>
          <View style={_u(`_fx_r`)}>
            {/* 附加文字 */}
            {item.text && <Div style={_u(`_fs_12_${color} _mr_10`)}>{item.text}</Div>}
            <View style={_u(`_arrow_4_${color}`)} />
          </View>
        </Div>
      ))}
    </View>
  );
}
