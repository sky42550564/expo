import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // 动态设置标题（如从API获取数据后）
    navigation.setOptions({
      headerTitle: '我的应用',
      headerLeft: () => (
        <Ionicons
          name="menu"
          size={24}
          color="#fff"
          style={{ marginLeft: 16 }}
          onPress={() => console.log('打开菜单')}
        />
      ),
    });
  }, []);

  return (
    <View>
      <View><Text>这是个人中心的首页</Text></View>
    </View>
  );
}

// export const options = {
//   headerTitle: '个人中心',
//   headerShown: true,
//   headerStyle: { backgroundColor: '#f00' },
//   headerTintColor: '#fff',
// };

// HomeScreen.options = () => ({
//   headerTitle: `文章`,
// });
