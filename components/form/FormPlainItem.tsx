import { View, Text } from 'react-native';
import { Form } from '@ant-design/react-native';

const FormCell = ({
  children, // 子组件
  placeholder, // 默认显示
  style, // 样式
  unit, // 单位
  value, // antd的Form.Item自动传下来的值
}: any) => {
  return (
    <View style={_u(`_fx_r`)}>
      {children ? (_.isString(children) ? <Text style={_u(`_fs_17`, style)}>{children}</Text> : children) : <Div style={_u(`_fs_17`, style)}>{value || placeholder}</Div>}
      {unit !== undefined && <Div s='_fs_red'>{unit}</Div>}
    </View>
  );
};

export default ({
  children, // 子组件
  label, // 标签
  name, // 字段名
  noLabel, // 不显示标签
  placeholder, // 默认显示
  style, // 样式
  unit, // 单位
}: any) => {
  return (
    <Form.Item
      label={noLabel ? null : label}
      name={name}
    >
      <FormCell {...{ children, placeholder, style, unit }} />
    </Form.Item>
  );
};
