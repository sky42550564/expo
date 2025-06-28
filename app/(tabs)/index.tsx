import { View, Image, Text } from 'react-native';
export default function Home() {
  const show = async () => { // 
  }
  const show1 = () => { // 
    $error('123123')
  }
  return (
    <View style={_u(`_pt_50`)}>
      {/* <Image style={_u(`_w_175`)} source={require('@/assets/images/goods.png')} resizeMode="stretch"></Image> */}
      <View style={_u(`_s_375_500_red`)}>
        <Img onPress={show} style={_u(`_s_100_200 _fs_38_bold_red _fx_rcc`)} src={require('@/assets/images/goods.png')} mode="width">
        fang</Img>
      </View>
    </View>
  );
}
