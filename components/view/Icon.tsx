import type { PropsWithChildren } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { Image, View, TouchableOpacity } from 'react-native';
import * as icons from '@expo/vector-icons';

/*
例子：
<Icon icon="checkmark-circle" onPress={onPress}></Icon>
<Icon icon="Ionicons:checkmark-circle" onPress={onPress}></Icon>
<Icon icon={_img('logo.png')} onPress={onPress}></Icon>
<Icon icon={require('@/assets/images/react-logo.png')}></Icon>
<Icon icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=="></Icon>
*/
type Props = PropsWithChildren<{
  onPress?: (event: GestureResponderEvent) => void; // 点击事件
  s?: string; // 样式，类格式，必须遵循@/utils/libs/uno.js的定义
  style?: object, // 样式
  icon: any; // icon
  size?: string | number; // icon
  color?: string; // icon
}>;

// 图标名称：https://icons.expo.fyi/Index
function Cell({
  icon, // 如果http:或data:开头 或有uri属性，为图片
  size = 28, // 大小
  color = '#000000', // 颜色
}: Props) {
  if ((_.startsWith(icon, 'http://') || _.startsWith(icon, 'https://') || _.startsWith(icon, 'data:'))) {  // 网络图片模式
    return <Image source={{ uri: icon }} style={_u(`_s_${size}`)} resizeMode="stretch"></Image>
  }
  if (icon.uri || _.isNumber(icon)) { // require的本地图片
    return <Image source={icon} style={_u(`_s_${size}`)} resizeMode="stretch"></Image>
  }
  let Element;
  if (icon.includes(':')) {
    const list = icon.split(':');
    Element = (icons as any)[list[0]];
    icon = list[1];
  }
  !Element && (Element = (icons as any)['Ionicons']);
  return <Element name={icon} size={+size} color={color} />
}

export default function Icon({
  onPress, // 点击事件
  s, // 样式，类格式
  style, // 样式
  ...params // 剩余参数
}: Props) {
  const st = _u(s, style);
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={st}>
        <Cell {...params}></Cell>
      </TouchableOpacity>
    )
  }
  return (
    <View style={st}>
      <Cell {...params}></Cell>
    </View>
  );
}
