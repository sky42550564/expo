import { Input } from '@ant-design/react-native';

export default ({
  form, // form
  prop, // 字段名
  label, // 标签
  labelLeft, // 标签的左边宽度
  labelWidth, // 标签的宽度
  labelRight, // 标签的右边宽度
  noLabel, // 不显示标签
  required, // 必选
  disabled = false, // 是否禁用
  placeholder, // 默认显示
  rule, // 附加的规则，可以正则，函数或者数组
  unit, // 单位
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
}: any) => {
  // 验证规则
  let _maxLength = maxLength;
  let keyboardType: any = 'default';
  const rules = (rule ? (_.isArray(rule) ? rule : [rule]) : []).map((o: any) => ({ // 验证规则
    validator: (rule: any, value: any, callback: any) => {
      if (_.isRegExp(o)) {
        if (!o.test(value)) {
          return callback(`请输入正确的${label}`); // 验证失败
        }
      } else {
        const ret = o({ v: value, $: form.data });
        if (ret) {
          return callback(ret); // 验证失败
        }
      }
      callback(); // 验证成功
    }
  }));
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }
  if (type === 'name') { // 验证人名
    rules.push({
      validator: (rule: any, value: any, callback: any) => {
        // 2-4个汉字
        if (value && !/^[\u4e00-\u9fa5]{2,4}$/.test(value)) {
          return callback(`请输入正确的${label}`); // 验证失败
        }
        // 验证成功
        callback();
      }
    });
  } else if (type === 'phone') { // 验证手机号码
    _maxLength = 11;
    keyboardType = 'phone-pad';
    rules.push({
      validator: (rule: any, value: any, callback: any) => {
        // 以1开头的11位数字
        if (value && !/^1\d{10}$/.test(value)) {
          return callback(`请输入正确的${label}`); // 验证失败
        }
        // 验证成功
        callback();
      }
    });
  } else if (type === 'email') { // 验证邮箱
    keyboardType = 'email-address';
    rules.push({
      validator: (rule: any, value: any, callback: any) => {
        if (value && !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)) {
          return callback(`请输入正确的${label}`); // 验证失败
        }
        // 验证成功
        callback();
      }
    });
  } else if (type === 'password') { // 验证密码
    _maxLength = Math.min(50, maxLength || 50);
    rules.push({
      validator: (rule: any, value: any, callback: any) => {
        // if (value && !/[a-zA-Z]/.test(value)) {
        //   return callback(`${label}必须包含一个字母`); // 没有包含字母
        // }
        if (value && value.length < 6) { // 密码小于了6位
          return callback(`${label}必须大于等于6位`);
        }
        // 验证成功
        callback();
      }
    });
  } else if (type === 'idNo') { // 身份证号码
    _maxLength = 18;
    rules.push({
      validator: (rule: any, value: any, callback: any) => {
        if (value && !utils.checkIdNo(value)) {
          return callback(`请填写正确的身份证号码`);
        }
        // 验证成功
        callback();
      }
    });
  } else if (type === 'textPlate') { // 车牌号码
    rules.push({
      validator: (rule: any, value: any, callback: any) => {
        if (value && !utils.checkPlateNo(value)) {
          return callback(`请填写正确的车牌号码`);
        }
        // 验证成功
        callback();
      }
    });
  }
  if (verifyField || verifyFunction) { // 验证字段
    rules.push({
      validator: (rule: any, value: any, callback: any) => {
        if (value) {
          if (verifyField && value !== form.data[verifyField]) {
            return callback(label + '不一致');
          } else if (verifyFunction) {
            if (!verifyFunction(form)) {
              return callback(label + '不一致');
            }
          }
        }
        // 验证成功
        callback();
      }
    });
  }
  const onInputChange = (e: any) => {
    const { value } = e.target;
    onChange && onChange(value);
    form.set(prop, value);
  }
  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled, unit }}>
      {
        !rows ?
          <Input
            placeholder={placeholder || `请填写${label}`}
            disabled={disabled}
            allowClear={allowClear}
            maxLength={_maxLength}
            showCount={showCount}
            prefix={prefix}
            suffix={suffix}
            inputStyle={inputStyle}
            type={keyboardType}
            value={form.data[prop]}
            onChange={onInputChange}
          />
          :
          <Input.TextArea
            placeholder={placeholder || `请填写${label}`}
            disabled={disabled}
            allowClear={allowClear}
            maxLength={_maxLength}
            showCount={showCount}
            inputStyle={inputStyle}
            rows={rows}
            autoSize={autoSize}
            value={form.data[prop]}
            onChange={onInputChange}
          />
      }
    </FormLabel>
  );
};
