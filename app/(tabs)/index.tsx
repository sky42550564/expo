import { Alert, Platform , Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
export default function Home() {
  const onPress = () => { // 
    $success('操作成功');
    console.log('=================123', 123);
  }
  return (
    // <Div s="_pt_50 _ph_10">
    <View style={_u(`_mt_100`)}>
      <Div s="_s_100_green _m_50 _br_10 _fx_rcc _bob_red" onPress={onPress}>fangyunjiang</Div>
      <Div s="_s_100_40 _c_red_blue">水电费水电费</Div>
    </View>
  );
}
