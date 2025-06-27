import { View } from 'react-native';

export default ({ route, options, navigation }: any) => {
  const handlePress = (route: any) => {
    navigation.navigate(route.name);
  };

  return (
    <View style={_u(`_wf_64 _fx_rb`)}>
      <View style={_u(`_arrow_left`)}></View>
      <View style={_u(`_fs_14`)}>你好</View>
      <View></View>
    </View>
  );
};
