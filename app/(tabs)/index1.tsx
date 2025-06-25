import { Alert, Platform , Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Ionicons from '@expo/vector-icons/Ionicons';
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
      <Ionicons name="checkmark-circle" size={32} color="green" />
      <Icon icon="checkmark-circle" onPress={onPress}></Icon>
      <Icon icon={_img('logo.png')} onPress={onPress}></Icon>
      <Icon icon={require('@/assets/images/react-logo.png')} ></Icon>
      <Icon icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=="></Icon>
    </View>
  );
}
