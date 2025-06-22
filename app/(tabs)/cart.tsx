import { Text, View } from 'react-native';
import { useSelector } from 'react-redux'; // 引入redux的函数

export default function HomeScreen() {
  const state = useSelector(reducer => (reducer as any).personal); // 取出来的是定义的initialState
  return (
    <View><Text>购物车页面 { state.personal.name }</Text></View>
  );
}
