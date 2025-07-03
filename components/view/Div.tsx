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
  fontStyle, // 字体样式
  childStyle, // 子元素样式
  angle, // 渐变的角度
  colors, // 渐变的字体颜色, 必须指定宽度和高度
  bcolors, // 渐变的背景色
}: any) {
  if (colors?.length > 1 || bcolors?.length > 1) { // 有渐变
    const { start, end } = angleToCoordinates(angle);
    // 如果是文字渐变，需要使用渐变进行渲染
    if (colors?.length > 1) {
      if (sr.h5) { // h5的颜色渐变处理
        return <LinearGradient
          colors={colors} // 渐变颜色数组
          start={start} // 起点坐标 (左上角)
          end={end}   // 终点坐标 (右下角)
          style={[_u(`_fx_1`), fontStyle, childStyle, { 'WebkitBackgroundClip': 'text', 'color': 'transparent' }]}>
          {children}
        </LinearGradient>
      }
      return (
        <MaskedView maskElement={<Text style={fontStyle}>{children}</Text>}>
          <LinearGradient
            colors={colors} // 渐变颜色数组
            start={start} // 起点坐标 (左上角)
            end={end}   // 终点坐标 (右下角)
            style={[_u(`_fx_1`), childStyle]}
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
        style={[_u(`_fx_1`), childStyle]}>
        <Children fontStyle={fontStyle} children={children}></Children>
      </LinearGradient>
    );
  }
  return <Children fontStyle={fontStyle} children={children}></Children>;
}

export default function Div({
  onPress, // 点击事件
  children, // 子组件
  s, // 样式，类格式
  style, // 样式
}: Props) {
  const st = _us(s, style);
  const angle = st.angle;
  const colors = st.colors;
  const bcolors = st.bcolors;
  delete st.angle;
  delete st.colors;
  delete st.bcolors;
  const { color, fontSize, fontWeight, lineHeight, ..._otherStyle } = st;
  const fontStyle = { color, fontSize, lineHeight: lineHeight * 0.7, fontWeight }; // 字体样式
  const { flexDirection, justifyContent, alignItems, flexWrap, gap, ...otherStyle } = _otherStyle;
  const childStyle = { flexDirection, justifyContent, alignItems, flexWrap, gap };
  const containerStyle = (colors?.length > 1 || bcolors?.length > 1) ? otherStyle : _otherStyle;
  if (bcolors?.length > 1) {
    containerStyle.overflow = 'hidden';
  }

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={containerStyle}>
        <Cell {...{ fontStyle, childStyle, angle, colors, bcolors, children }}></Cell>
      </TouchableOpacity>
    )
  }
  return (
    <View style={containerStyle}>
      <Cell {...{ fontStyle, childStyle, angle, colors, bcolors, children }}></Cell>
    </View>
  )
}
