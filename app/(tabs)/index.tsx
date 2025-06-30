import { View, ScrollView, Image, Text } from 'react-native';
import type { FormProps } from '@ant-design/react-native';
import { Button, Form, Input } from '@ant-design/react-native';
import { FloatingAction } from "react-native-floating-action";

export default function Home() {
  const pageData = {
    table: 'student',
    label: '人员',
    fields: [
      {
        label: '头像',
        name: 'head',
        value: { type: 'image' },
      },
      {
        label: '姓名',
        name: 'name',
        value: { type: 'text' },
      },
      // {
      //   label: '手机号码',
      //   name: 'phone',
      //   value: { type: 'phone' },
      // },
      // {
      //   label: '性别',
      //   name: 'sex',
      //   value: { type: 'radio', options: ['男', '女'], default: 0 },
      // }
    ]
  };
  return (
    <ScrollView style={_u(`_fx_1 _pb_120`)}>
      <List pageData={pageData}></List>
    </ScrollView>
  );
}
