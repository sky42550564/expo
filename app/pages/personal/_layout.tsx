import { Pressable, Text, View } from 'react-native';
export default function HomeScreen() {
  const setName = router.passProps.setName;
  return (
    <View>
      <Pressable onPress={setName.bind(null, '你好')}><Text>点击执行</Text></Pressable>
      <Text>个人中心页面xx</Text>
    </View>
  );
}
