import { View, Image, Text } from 'react-native';
import type { FormProps } from '@ant-design/react-native';
import { Button, Form, Input } from '@ant-design/react-native';
export default function Home() {
  const [form] = Form.useForm();
  const sumbit = async () => { // 
    try {
      const ret = await form.validateFields();
      console.log('=================ret', ret);
    } catch(e) {
      console.log('=================e', e);
    }
  }
  const pageData = {
    apis: { list: '/list/tb_member' },
  };



  const onFinish: FormProps['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <View style={_u(`_pt_50`)}>
      {/* <List pageData={pageData}></List> */}
      {/* <Form form={form}>
        <Form.Item
          messageVariables={{ another: 'good' }}
          label="user"
          rules={[{ required: true, message: '${another} is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          messageVariables={{ label: 'good' }}
          label={<span>user</span>}
          rules={[{ required: true, message: '${label} is required' }]}
        >
          <Input />
        </Form.Item>
        <Div onPress={sumbit} s='_button_white_warning_error_v_335_42_fs14_r _of_hidden'>提交</Div>
      </Form> */}
      <Form
      form={form}
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <FormTextItem label='姓名' name='name' type='name' />
        <FormTextItem label='密码' name='password' />

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Div onPress={sumbit} s='_button_white_warning_error_v_335_42_fs14_r _of_hidden'>提交</Div>
      </Form>
    </View>
  );
}
