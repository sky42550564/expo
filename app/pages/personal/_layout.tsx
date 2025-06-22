import { setPersonal } from '@/store/personal'; // 导入在personalReducer中定义的方法
import { Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux'; // 引入修改全局状态的方法

export default function HomeScreen() {
  const setName = router.passProps.setName;
  const dispatch = useDispatch(); // 生成一个dispatch的函数

  const click1 = async () => {
    setName('你好' + Math.random());
    dispatch(setPersonal({ name: '你好' + Math.random() }));
    router.back();
  }
  const click = async () => {
    const data = await utils.post('/test', { a: 1 });
    if (!data.success) {
      return $alert(data.message);
    }
    $success('操作成功');
  }
  return (
    <View>
      <Pressable onPress={click}><Text>点击执行</Text></Pressable>
      <Text>个人中心页面xx</Text>
    </View>
  );
}
