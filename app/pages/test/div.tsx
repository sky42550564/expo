import { View, Image, Text } from 'react-native';
export default function Home() {
  const show = async () => { // 
    $alert('123')
  }
  const show1 = () => { // 
    console.log('=================123', 123);
  }
  return (
    <View style={_u(`_pt_50`)}>
      {/* <Image style={_u(`_w_175`)} source={require('@/assets/images/goods.png')} resizeMode="stretch"></Image> */}
      <View style={_u(`_s_375_300_red`)}>
        {/* <Div s="_s_200_300 _bc_blue_green _m_20 _fx_rb">
          <Div onPress={show}  s="_fs_30_white">方运江</Div>
          <Div s="_fs_30_white">方运江</Div>
        </Div> */}
        <Div  onPress={show} s="_s_250_50_white _fx_rc">
          <Div s="_s_120_50 _fs_30 _c_red_green">方运江</Div>
        </Div>
        <Div s="_s_100_blue"></Div>
      </View>
    </View>
  );
}
