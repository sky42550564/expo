import { Pressable, Text, View } from 'react-native';
export default function HomeScreen() {
  const setName = router.passProps.setName;
  const click = () => {
    setName('你好' + Math.random());
    router.back();
  }
  return (
    <View>
      <Pressable onPress={click}><Text>点击执行</Text></Pressable>
      <Text>个人中心页面xx</Text>
    </View>
  );
}
