import { Text } from 'react-native';

export default function HomeScreen() {
  const list = [1, 2, 3];
  const click = async () => {
    const data = await api.getSettingInfo({ a: 1 });
    if (!data.success) {
      return $alert(data.message);
    }
    $success('操作成功');
  }
  const click1 = async () => {
    const data = await utils.post('/test', { a: 1 });
    if (!data.success) {
      return $alert(data.message);
    }
    $success('操作成功');
  }
  return (
    <View style={_u(`_wf_100 _fx_ccc`)}>
      <TouchableOpacity onPress={click} style={_u(`_button_warning_error_335_42_r`)}>
        <Text style={_u(`_c_white _fs_14_bold`)}>确定</Text>
      </TouchableOpacity>
    </View>
  );
}
