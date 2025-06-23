import { Image, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={_u(`_wf_100_red _fx_c`)}>
      <Image source={_img('logo.png')} style={_u(`_s_100`)} resizeMode="cover"></Image>
    </View>
  );
}
