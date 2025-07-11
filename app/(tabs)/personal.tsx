import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
// import { useSelector } from 'react-redux'; // 引入redux的函数
import { useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function HomeScreen() {
  const navigation = useNavigation();
  const { personal, store: personalStore } = useRedux('personal');
  const [name, setName] = useState('fangyunjiang');
  const callback = (k: any) => {
    console.log('=================k', k);
  }
  // const state = useSelector(reducer => (reducer as any).personal); // 取出来的是定义的initialState
  const onPress = (k: any) => {
    // router.push({ pathname:'/pages/personal',  state: { fang: k, a: {a:1, b:2}, callback }});
    router.push('/pages/personal',
      {
        fang: k, a: { a: 1, b: 2 }, setName, title: '传递的标题', headerRight: () => (
          <Ionicons
            name="menu"
            size={24}
            color="#fff"
            style={{ marginLeft: 16 }}
            onPress={() => console.log('打开菜单')}
          />
        ),
      }
    );
    // navigation.navigate('pages/personal/index');
    // personalStore.setFang('123');
  }
  return (
    <>
      <View><Text>这是结果: {name} </Text></View>
      {/* <View><Text>这是名字: { state.personal.name } </Text></View> */}
      <View><Text>这是名字: {personal.name} </Text></View>
      {[1, 2, 3, 4, 5].map((o) => (<Pressable key={o} onPress={onPress.bind(null, o)}><Text>个人中心页面{o}</Text></Pressable>))}
    </>
  );
}
