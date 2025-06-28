import { View, Image, Text } from 'react-native';
export default function Home() {
  const show = async () => { // 
  }
  const show1 = () => { // 
    $error('123123')
  }
  return (
    <View style={_u(`_pt_50`)}>
      <Img onPress={show} style={_u(`_s_100_200 _fs_38_bold_red _fx_rcc`)} url={require('@/assets/images/goods.png')} mode="width">
        fang</Img>
      <Img s="_h_176" url={require('@/assets/images/goods.png')} mode="stretch" ></Img>
      <Img s="_w_75" url="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==" mode="width"></Img>
    </View>
  );
}
