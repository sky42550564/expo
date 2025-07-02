import { View } from 'react-native';

export default function Home() {
  const form = useForm({ name: '方运江', birthday:  ["北京市", "市辖区", "丰台区"], head: 'http://192.168.45.124:5188/uploadFile/20250322/67de2e07707a672acc2c1d92.jpg' }, { needShowRequired: false, labelWidth: 100, hasSpace: true });

  const sumbit = () => { // 
    if (!form.validate()) return;
    const params = form.data;
    console.log('=================params', params);
  }

  return (
    <View style={_u(`_pt_50`)}>
      <Div s=''>{form.data}</Div>
      <FormTextItem label='姓名' prop='name' form={form} />
      <FormCityItem label='生日' prop='birthday' form={form} />
      {/* <FormPlainItem label='姓名' prop='name' form={form} />
      <FormNumberItem label='年龄' prop='age' form={form} ratio={100} unit='%' />
      <FormCheckboxItem label='性别' prop='sex' form={form} options={['男', '女']} />
      <FormImageItem label='头像' prop='head' form={form} /> */}
      <Div onPress={sumbit} s='_button_white_warning_error_v_335_42_fs14_r _of_hidden'>提交</Div>
    </View>
  );
}
