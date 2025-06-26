// import { setPersonal } from '@/store/personal'; // 导入在personalReducer中定义的方法
import { Pressable, Text, View } from 'react-native';
// import { useDispatch } from 'react-redux'; // 引入修改全局状态的方法

export default function HomeScreen() {
  const { personal, store: personalStore } = useRedux('personal');
  const setName = router.passProps.setName;
  // const dispatch = useDispatch(); // 生成一个dispatch的函数

  const click1 = async () => {
    // setName('你好' + Math.random());
    // dispatch(setPersonal({ name: '你好' + Math.random() }));
    // personalStore.setPersonal({ name: '你好' + Math.random() });
    personalStore.updatePersonal({ name: '你好' + Math.random() });
    // router.back();
  }
  const click = async () => {
    // const data = await utils.post('/test', { a: 1 });
    // if (!data.success) {
    //   return $alert(data.message);
    // }
    // $success('操作成功');
    const x = _u(`_s_100_${200}_cmain`)
    console.log('=================_u', x);
  }
  return (
    <View>
      <Pressable onPress={click1}><Text>点击执行</Text></Pressable>
      <View><Text>名字: {personal.name} </Text></View>
      <View><Text>年龄: {personal.age} </Text></View>
      <Text>个人中心页面xx</Text>
    </View>
  );
}
