import { Alert, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const list = [1, 2, 3];
  const click = async () => {
    const data = await api.getSettingInfo({ keys: 'platformId,superAdminId' });
    if (!data.success) {
      return $alert(data.message);
    }
    $success(JSON.stringify(data.result));
  }
  const click1 = async () => {
    const data = await utils.post('/test', { a: 1 });
    if (!data.success) {
      return $alert(data.message);
    }
    $success('操作成功');
  }
  return (
    <View style={_u(`_wf_300_yellow _fx_ccc _pt_100`)}>
      <View style={_u(`_s_100_red`)}></View>
      <TouchableOpacity onPress={click} style={_u(`_button_warning_335_42_r`)}>
        <Text style={_u(`_c_white _fs_14_bold`)}>确定</Text>
      </TouchableOpacity>
    </View>
  );
}
