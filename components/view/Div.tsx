import type { PropsWithChildren } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

// 背景渐变： <Div s="_bc_red_blue"></Div>
// 字体渐变： <Div s="_c_red_blue"></Div>
type Props = PropsWithChildren<{
  s?: string; // 样式，类格式，必须遵循@/utils/libs/uno.js的定义
  style?: object, // 样式
  onPress?: (event: GestureResponderEvent) => void; // 点击事件
}>;

// 角度转 LinearGradient 的 start/end 坐标
const angleToCoordinates = (angle: number = 0) => {
  // 将角度转换为从垂直方向（向上）顺时针旋转的弧度
  const rad = angle * (Math.PI / 180);
  // 计算起点和终点坐标
  const start = {
    x: 0.5 - 0.5 * Math.cos(rad),
    y: 0.5 - 0.5 * Math.sin(rad),
  };
  const end = {
    x: 0.5 + 0.5 * Math.cos(rad),
    y: 0.5 + 0.5 * Math.sin(rad),
  };
  return { start, end };
};

function Cell({
  children, // 子组件
  s, // 样式，类格式
  style, // 样式
}: Props) {
  const st = style || _us(s);
  if (sr.h5) { // h5直接返回div
    return <div style={st}>{children}</div>
  }
  const angle = st.angle;
  const colors = st.colors;
  const bcolors = st.bcolors;
  delete st.angle;
  delete st.colors;
  delete st.bcolors;
  const { color, fontSize, fontWeight, lineHeight, ...otherStyle } = st;
  const fontStyle = { color, fontSize, lineHeight: lineHeight * 0.7, fontWeight }; // 字体样式
  if (colors?.length > 1 || bcolors?.length > 1) { // 有渐变
    const { start, end } = angleToCoordinates(angle);
    // 如果是文字渐变，需要使用渐变进行渲染
    if (colors?.length > 1) {
      return (
        <MaskedView maskElement={<Text style={fontStyle}>{children}</Text>}>
          <LinearGradient
            colors={colors} // 渐变颜色数组
            start={start} // 起点坐标 (左上角)
            end={end}   // 终点坐标 (右下角)
            style={otherStyle}
          />
        </MaskedView>
      );
    }
    // 如果是背景渐变，需要使用渐变进行渲染
    return (
      <LinearGradient
        colors={bcolors} // 渐变颜色数组
        start={start} // 起点坐标 (左上角)
        end={end}   // 终点坐标 (右下角)
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
