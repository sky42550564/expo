import { View, Image, Text } from 'react-native';
export default function Home() {
  const [checked, setChecked] = useState();
  const onClick = () => { // 
    setChecked(!checked);
  }
  const pageData = {
    apis: { list: '/list/tb_member' },
  };
  return (
    <View style={_u(`_pt_50`)}>
      <List pageData={pageData}></List>
    </View>
  );
}
