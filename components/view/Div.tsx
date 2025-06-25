import type { PropsWithChildren } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

// 背景渐变： <Div s="_bc_red_blue"></Div>
// 字体渐变： <Div s="_c_red_blue"></Div>
type Props = PropsWithChildren<{
  s: string | object | undefined; // 样式，类格式，必须遵循@/utils/libs/uno.js的定义
  style: object | undefined, // 样式
  onPress?: (event: GestureResponderEvent) => void; // 点击事件
}>;

function Cell({
  children, // 子组件
  s, // 样式，类格式
  style, // 样式
}: Props) {
  const st = style || _us(s);
  if (sr.h5) { // h5直接返回div
    return <div style={st}>{children}</div>
  }
  const dir = st.dir;
  const colors = st.colors;
  const bcolors = st.bcolors;
  delete st.dir;
  delete st.colors;
  delete st.bcolors;
  const { color, fontSize, fontWeight, ...otherStyle } = st;
  const fontStyle = { color, fontSize, fontWeight }; // 字体样式
  if (colors?.length > 1) { // 如果是文字渐变，需要使用渐变进行渲染
    return (
      <MaskedView maskElement={<Text style={fontStyle}>{children}</Text>}>
        <LinearGradient
          colors={colors} // 渐变颜色数组
          start={{ x: 0, y: 0 }} // 起点坐标 (左上角)
          end={{ x: 1, y: 1 }}   // 终点坐标 (右下角)
          style={otherStyle}
        />
      </MaskedView>
    );
  }
  if (bcolors?.length > 1) { // 如果是背景渐变，需要使用渐变进行渲染
    return (
      <LinearGradient
        colors={bcolors} // 渐变颜色数组
        start={{ x: 0, y: 0 }} // 起点坐标 (左上角)
        end={{ x: 1, y: 1 }}   // 终点坐标 (右下角)
        style={st}
      >
        {_.isString(children) ? <Text style={fontStyle}>{children}</Text> : children}
      </LinearGradient>
    );
  }
  return (
    <View style={st}>
      {_.isString(children) ? <Text style={fontStyle}>{children}</Text> : children}
    </View>
  );
}

export default function Div({
  onPress, // 点击事件
  ...params // 剩余参数
}: Props) {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
        <Cell {...params}></Cell>
      </TouchableOpacity>
    )
  }
  return <Cell {...params}></Cell>;
}
