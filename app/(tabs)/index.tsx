import { View } from 'react-native';

export default function Home() {
  const form = useForm({ name: '方运江' }, { needShowRequired: false, labelWidth: 100, hasSpace: true });
  const [activeTabIndex, setActiveTabIndex] = useState(false);


  const sumbit = () => { // 
    if (!form.validate()) return;
    const params = form.data;
    console.log('=================params', params);
  }

  return (
    <View style={_u(`_pt_50`)}>
      <Div s='_mt_40'>{form.data}</Div>
       <FormTextItem label='姓名'  prop='name' form={form} />
       <FormSelectItem label='性别' options={['  男  ','  女  ']} prop='xx' form={form} />
      <Div onPress={sumbit} s='_button_white_warning_error_v_335_42_fs14_r _of_hidden'>提交</Div>
    </View>
  );
}
