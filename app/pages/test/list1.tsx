import { Text, View } from 'react-native';

export default function Home() {
  const form = useForm({ name: '方运江' }, { needShowRequired: false, labelWidth: 100, hasSpace: true });
  const [activeTabIndex, setActiveTabIndex] = useState(false);


  const sumbit = () => { // 
    if (!form.validate()) return;
    const params = form.data;
    console.log('=================params', params);
  }

  const pageData = {
    list: ['男', '女'],
    renderItem: ({ item }: any) => {
      return <Div>{item}</Div>
    }
  };

  return (
    <View style={_u(`_fx_1 _pt_50`)}>
      <List pageData={pageData}></List>
    </View>
  );
}
