import { View, ScrollView, Image, Text } from 'react-native';
import type { FormProps } from '@ant-design/react-native';
import { Button, Form, Input, Tooltip } from '@ant-design/react-native';
import { FloatingAction } from "react-native-floating-action";


export default function Home() {
  const pageData = {
    table: 'student',
    label: '人员',
    search: true || [
      [ // 多个用下拉框选择
        { label: '姓名', name: 'name', value: { type: 'text', full: false } },
        { label: '手机号码', name: 'phone', value: { type: 'text' } },
      ],
    ],
    fields: [
      {
        label: '头像',
        name: 'head',
        value: { type: 'image' },
        list: { image: true, style: _u(`_r_50 _of_hidden`), click: () => $alert('123') }, // 列表配置
      },
      {
        label: '姓名',
        name: 'name',
        value: { type: 'text' },
      },
      {
        label: '手机号码',
        name: 'phone',
        value: { type: 'phone' },
      },
      {
        label: '性别',
        name: 'sex',
        value: { type: 'radio', options: ['男', '女'], default: 0 },
      }
    ]
  };


  return (
    <ListPage pageData={pageData}></ListPage>
   
  );
}
