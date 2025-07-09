import { View } from 'react-native';

export default function Home() {
  return (
    <View style={_u(`_pt_50`)}>
      <View style={_u(`_fs_40_red`)}>{_t('方运江')}</View>
      <View style={_u(`_fs_40_red`)}>{_t('方运江#1')}</View>
      <View style={_u(`_fs_40_red`)}>{_t('方运江#2')}</View>
      <View style={_u(`_fs_40_red`)}>{_t('方运江\\#1')}</View>
      <Div s='_fs_40_red'>方运江</Div>
      <Div s='_fs_40_red'>方运江#1</Div>
      <Div s='_fs_40_red'>方运江#2</Div>
      <Div s='_fs_40_red'>方运江\#1</Div>
    </View>
  );
}
