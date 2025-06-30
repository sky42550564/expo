import { Form, Input } from '@ant-design/react-native';

const FormCell = (props: any) => {
  const {
    placeholder, // 默认显示
    disabled = false, // 是否禁用
    rows, // 如果大于1为多行编辑器
    autoSize, // 自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }
    maxLength, // 最大长度
    allowClear = true, // 是否显示清楚图标
    showCount = false, // 显示输入的字数，必须配合 maxLength 使用
    prefix, // 带有前缀图标的 input
    suffix, // 带有后缀图标的 input
    inputStyle, // FormCell style
    keyboardType, // 键盘类型
    value, // antd的Form.Item自动传下来的值
    onChange, // antd的Form.Item自动传下来的回调
  } = props;
  const onInputChange = (e: any) => {
    onChange && onChange(e.target.value)
  }
  return !rows ?
    <Input
      placeholder={placeholder}
      disabled={disabled}
      allowClear={allowClear}
      maxLength={maxLength}
      showCount={showCount}
      prefix={prefix}
      suffix={suffix}
      inputStyle={inputStyle}
      type={keyboardType}
      value={value}
      onChange={onInputChange}
    />
    :
    <Input.TextArea
      placeholder={placeholder}
      disabled={disabled}
      allowClear={allowClear}
      maxLength={maxLength}
      showCount={showCount}
      inputStyle={inputStyle}
      rows={rows}
      autoSize={autoSize}
      value={value}
      onChange={onInputChange}
    />
}

export default ({
  form, // 整个form
  label, // 标签
  name, // 字段名
  noLabel, // 不显示标签
  placeholder, // 默认显示
  required, // 必选
  rule, // 附加的规则，可以正则，函数或者数组
  disabled = false, // 是否禁用
  type, // 类型：name|phone|email|password
  rows, // 如果大于1为多行编辑器
  autoSize, // 自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }
  maxLength, // 最大长度
  allowClear = true, // 是否显示清楚图标
  showCount = false, // 显示输入的字数，必须配合 maxLength 使用
  verifyField, // 是否是比较字段
  verifyFunction, // 当type为verify的时候使用函数，返回true通过，否则不通过
  prefix, // 带有前缀图标的 input
  suffix, // 带有后缀图标的 input
  inputStyle, // FormCell style
  onChange, // 监听变化时的回调
  model = [], // 双向绑定， [value, setValue] 例如：<FormNumberItem label='年龄' model={[age, setAge]} />
}: any) => {
  // 验证规则
  let _maxLength = maxLength;
  let keyboardType = 'default';
  const rules = (rule ? (_.isArray(rule) ? rule : [rule]) : []).map((o: any) => ({ // 验证规则
    validator: (rule: any, value: any) => {
      if (_.isRegExp(o)) {
        if (!o.test(value)) {
          return Promise.reject(new Error(`请输入正确的${label}`)); // 验证失败
        }
      } else {
        const ret = o({ v: value, $: form });
        if (ret) {
          return Promise.reject(new Error(ret)); // 验证失败
        }
      }
      return Promise.resolve(); // 验证成功
    }
  }));
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }
  if (type === 'name') { // 验证人名
    rules.push({
      validator: (rule: any, value: any) => {
        // 2-4个汉字
        if (value && !/^[\u4e00-\u9fa5]{2,4}$/.test(value)) {
          return Promise.reject(new Error(`请输入正确的${label}`)); // 验证失败
        }
        // 验证成功
        return Promise.resolve();
      }
    });
  } else if (type === 'phone') { // 验证手机号码
    _maxLength = 11;
    keyboardType = 'phone-pad';
    rules.push({
      validator: (rule: any, value: any) => {
        // 以1开头的11位数字
        if (value && !/^1\d{10}$/.test(value)) {
          return Promise.reject(new Error(`请输入正确的${label}`)); // 验证失败
        }
        // 验证成功
        return Promise.resolve();
      }
    });
  } else if (type === 'email') { // 验证邮箱
    keyboardType = 'email-address';
    rules.push({
      validator: (rule: any, value: any) => {
        if (value && !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)) {
          return Promise.reject(new Error(`请输入正确的${label}`)); // 验证失败
        }
        // 验证成功
        return Promise.resolve();
      }
    });
  } else if (type === 'password') { // 验证密码
    _maxLength = Math.min(50, maxLength || 50);
    rules.push({
      validator: (rule: any, value: any) => {
        // if (value && !/[a-zA-Z]/.test(value)) {
        //   return Promise.reject(new Error(`${label}必须包含一个字母`); // 没有包含字母
        // }
        if (value && value.length < 6) { // 密码小于了6位
          return Promise.reject(new Error(`${label}必须大于等于6位`));
        }
        // 验证成功
        return Promise.resolve();
      }
    });
  } else if (type === 'idNo') { // 身份证号码
    _maxLength = 18;
    rules.push({
      validator: (rule: any, value: any) => {
        if (value && !utils.checkIdNo(value)) {
          return Promise.reject(new Error(`请填写正确的身份证号码`));
        }
        // 验证成功
        return Promise.resolve();
      }
    });
  } else if (type === 'textPlate') { // 车牌号码
    rules.push({
      validator: (rule: any, value: any) => {
        if (value && !utils.checkPlateNo(value)) {
          return Promise.reject(new Error(`请填写正确的车牌号码`));
        }
        // 验证成功
        return Promise.resolve();
      }
    });
  }
  if (verifyField || verifyFunction) { // 验证字段
    rules.push({
      validator: (rule: any, value: any) => {
        if (value) {
          if (verifyField && value !== form[verifyField]) {
            return Promise.reject(new Error(label + '不一致'));
          } else if (verifyFunction) {
            if (!verifyFunction(form)) {
              return Promise.reject(new Error(label + '不一致'));
            }
          }
        }
        // 验证成功
        return Promise.resolve();
      }
    });
  }
  return (
    <Form.Item
      label={noLabel ? null : label}
      name={name}
      rules={rules}
    >
      <FormCell {...{ placeholder: placeholder || `请填写${label}`, disabled, allowClear, maxLength: _maxLength, showCount, prefix, suffix, keyboardType, inputStyle, rows, autoSize, value: model[0], onChange: model[1] || onChange }} />
    </Form.Item>
  );
};
