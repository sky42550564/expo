import { View, Image, Text } from 'react-native';
import type { FormProps } from '@ant-design/react-native';
import { Button, Form, Input } from '@ant-design/react-native';

export default function Home() {
  // const [formData, setformData] = useState({ name: '方运江', class: '123' });
  const form = useForm({ name: '方运江' }, { needShowRequired: false, labelWidth: 100, hasSpace: true });

  const sumbit = () => { // 
    if (!form.validate()) return;
    const params = form.data;
    console.log('=================params', params);
  }

  return (
    <View style={_u(`_pt_50`)}>
      <Div s=''>{form.data}</Div>
      <FormTextItem label='姓名' prop='name' form={form} />
      <FormNumberItem label='年龄' prop='age' form={form} ratio={100} unit='%'/>
      <Div onPress={sumbit} s='_button_white_warning_error_v_335_42_fs14_r _of_hidden'>提交</Div>

    </View>
  );
}
