import { View, Image, Text } from 'react-native';
export default function Home() {
  const show = async () => { // 
    $alert('123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123')
  }
  const show1 = () => { // 
    console.log('=================123', 123);
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
