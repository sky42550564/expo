import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
export default function Home() {
  const onPress = () => { // 
    $success('操作成功');
    console.log('=================123', 123);
  }
  return (
    // <Div s="_pt_50 _ph_10">
      <Div s="_s_100_red" onPress={onPress}></Div>
      // <Div s="_s_100 _bc_blue_green"></Div>
      // <TouchableOpacity onPress={onPress} style={_u(`_button_warning_335_42_r _mt_100`)}>
      //   <Text style={_u(`_c_white _fs_14_bold`)}>确定</Text>
      // </TouchableOpacity>
    //   <Div></Div>
    // </Div>
    // <View style={_u(`_s_100`)}>
      // <LinearGradient
      //   colors={['#4c669f', '#3b5998', '#192f6a']} // 渐变颜色数组
      //   start={{ x: 0, y: 0 }} // 起点坐标 (左上角)
      //   end={{ x: 1, y: 1 }}   // 终点坐标 (右下角)
      //   style={_u(`_s_100`)}    // 填充整个屏幕
      // >
      // </LinearGradient>
    // </View>
  );
}
