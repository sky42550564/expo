import { TouchableOpacity, Image } from 'react-native';
import { Form } from '@ant-design/react-native';
import ImageUploader from './ImageUploader';

export default ({
  form, // 整个form
  label, // 标签
  name, // 字段名
  noLabel, // 不显示标签
  placeholder, // 默认显示
  required, // 必选
  rule, // 附加的规则，可以正则，函数或者数组
  width = 80, // 宽度
  height = 80, // 高度
  disabled = false, // 是否禁用
  onChange, // 输入框内容变化时的回调
  url,
}: any) => {
  // 验证规则
  const rules = [];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const onInputChange = (value: any) => {
    onChange && onChange(value)
  }
  const selectPicture = () => {
  }
  return (
    <Form.Item
      label={noLabel ? null : label}
      name={name}
      rules={rules}
    >
      <ImageUploader
          form={Form.useForm()[0]}
          name="image"
          maxCount={5}
        />
    </Form.Item>
  );
};
