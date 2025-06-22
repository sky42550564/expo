import { setPersonal } from '@/store/personal'; // 导入在personalReducer中定义的方法
import { Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux'; // 引入修改全局状态的方法

export default function HomeScreen() {
  const setName = router.passProps.setName;
  const dispatch = useDispatch(); // 生成一个dispatch的函数

  const click = () => {
    // setName('你好' + Math.random());
    dispatch(setPersonal({ name: '你好' + Math.random() }));
    router.back();
  }
  return (
    <View>
      <Pressable onPress={click}><Text>点击执行</Text></Pressable>
      <Text>个人中心页面xx</Text>
    </View>
  );
}
