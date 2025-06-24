import type { PropsWithChildren, ReactElement } from 'react';
import { View, Text, Pressable } from 'react-native';

type Props = PropsWithChildren<{
  s: string | object | undefined; // 样式，style的缩写，必须遵循@/utils/libs/uno.js的定义
}>;

export default function Div({
  children, // 子组件
  s, // 样式
}: Props) {
  return (
    <View style={_u(s)}>
      {children}
    </View>
  );
}
