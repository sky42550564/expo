import { View, ScrollView, Image, Text } from 'react-native';
import type { FormProps } from '@ant-design/react-native';
import { Button, Form, Input } from '@ant-design/react-native';
import { FloatingAction } from "react-native-floating-action";

export default function Home() {
  const pageData = {
    apis: { list: '/list/tb_member' },
  };
  const [lastName, setLastName] = useState('fang');
  const [firstName, setFirstName] = useState('yun');
  const fullName = useComputed(() => {
    return firstName + lastName;
  }, [firstName, lastName]);
  return (
    <ScrollView style={_u(`_fx_1 _pb_120`)}>
      {/* <List pageData={pageData}></List> */}
      <FormTextItem label='姓：' model={[lastName, setLastName]} />
      <FormTextItem label='名：' model={[firstName, setFirstName]} />
      <FormPlainItem label='全名：'>{fullName}</FormPlainItem>
    </ScrollView>
  );
}
