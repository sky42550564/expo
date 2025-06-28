import { View, Image, Text } from 'react-native';
export default function Home() {
  const show = async () => { // 
    $alert('123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123')
  }
  const show1 = () => { // 
    console.log('=================123', 123);
  }
  return (
    <View style={_u(`_pt_50`)}>
      <Img onPress={show} s="_h_176" url={require('@/assets/images/goods.png')} mode="stretch" ></Img>
      <Img s="_w_75" url="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==" mode="width"></Img>
    </View>
  );
}
