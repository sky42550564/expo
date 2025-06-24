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
    <View>
      <Div s="_s_100_green _m_50 _br_10 _fx_rcc _bob_red" onPress={onPress}>fangyunjiang</Div>
      <View style={_u(`_s_100_green _m_50 _br_20`)}></View>
      <View style={styles.circle}></View>
      <MaskedView
        maskElement={
          <Text style={styles.text}>水电费水电费</Text>
        }
      >
        <LinearGradient
          colors={['#4158D0', '#C850C0', '#FFCC70']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={_u(`_wf_40`)}
        />
      </MaskedView>
      <View style={_u(`_s_100_red`)}></View>
    </View>
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


const styles = StyleSheet.create({
  circle: {
    width: 100,      // 宽度和高度必须相等
    height: 100,
    borderRadius: 50, // 等于宽度/2
    backgroundColor: 'red',
    borderWidth: 10,
    borderColor: 'green',
    borderStyle: 'solid',
  },
  container: {
    overflow: 'hidden',
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white', // 文字颜色需与背景形成对比
    fontSize: 28,
  },
});
