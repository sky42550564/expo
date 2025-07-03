import { View } from 'react-native';

export default function Home() {
  const form = useForm({ name: '方运江' }, { needShowRequired: false, labelWidth: 100, hasSpace: true });
  const [activeTabIndex, setActiveTabIndex] = useState(false);

  const sumbit = () => { // 
    if (!form.validate()) return;
    const params = form.data;
    console.log('=================params', params);
  }

  const options = [{ label: '第一', value: '1', childrenx: [{ label: '第一', value: '1' }, { label: '第二', value: '2' }] }, { label: '第二', value: '2', children: [{ label: '第一', value: '1' }, { label: '第二', value: '2' }] }];

  const tabs = [{label: '初级会员', badge: 5}, {label: '高级会员', badge: 10}];
  return (
    <View style={_u(`_pt_50`)}>
      <Div s=''>{form.data}</Div>
      <Div s=''>{activeTabIndex}</Div>
      <Tabs model={[activeTabIndex, setActiveTabIndex]} tabs={tabs} itemWidth={80} lineWidth={20} labelKey='label'></Tabs>
      <FormTextItem label='姓名' type='phone' prop='phone' form={form} />
      {/* <FormRegionItem label='生日' prop='xx'  form={form} /> */}
      <FormVerifyCodeItem label='生日' prop='xx' form={form} />
      {/* <FormSelectTreeItem label='类型' prop="xx" table="tb_goods_type" dependParams={[{ name: 'parentGoodsTypeIds', valueKey: 'parentIds' }]} form={form} /> */}

      {/* <FormPlainItem label='姓名' prop='name' form={form} />
      <FormNumberItem label='年龄' prop='age' form={form} ratio={100} unit='%' />
      <FormCheckboxItem label='性别' prop='sex' form={form} options={['男', '女']} />
      <FormImageItem label='头像' prop='head' form={form} /> */}
      <Div onPress={sumbit} s='_button_white_warning_error_v_335_42_fs14_r _of_hidden'>提交</Div>
    </View>
  );
}
