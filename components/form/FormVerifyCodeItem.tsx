import { Input } from '@ant-design/react-native';

export default ({
  form, // 整个form
  prop, // 字段名
  label, // 标签
  labelLeft, // 标签的左边宽度
  labelWidth, // 标签的宽度
  labelRight, // 标签的右边宽度
  noLabel, // 不显示标签
  required, // 必选
  disabled = false, // 是否禁用
  length = 4, // 长度，默认为4位
  onChange, // 监听变化时的回调
}: any) => {
  // 验证规则
  const rules: any = [{
    validator: (rule: any, value: any, callback: any) => {
      if (!RegExp(`^\\d{${length}}$`).test(value)) {
        return callback(`请输入正确的${label}`); // 验证失败
      }
      callback(); // 验证成功
    }
  }];
  if (required !== false) { // 默认是必传，只有传false的时候才不是必传
    rules.unshift({ required: true, message: `${label}不能为空` });
  }

  const timerId = useRef(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    return () => {
      clearInterval(timerId.current);
    }
  }, []);

  const sendVerifyCode = async () => {
    if (!form.data.phone) {
      return $alert('请输入手机号码');
    }
    if (!utils.checkPhone(form.data.phone)) {
      return $alert('请输入正确的手机号码');
    }
    setTime(60); // 设置倒计时为60
    const data = await api.requestSendVerifyCode({ phone: form.data.phone });
    if (!data.success) {
      return $alert(data.message);
    }
    timerId.current = setInterval(() => {
      setTime((prev: number) => prev - 1);
    }, 1000); // 每秒执行一次
  }


  const onInputChange = (e: any) => {
    const { value } = e.target;
    onChange && onChange(value);
    form.set(prop, value);
  }

  return (
    <FormLabel {...{ form, prop, label, labelLeft, labelWidth, labelRight, noLabel, rules, required, disabled }}>
      <Div s='_wf _fx_r_ac _pb_4'>
        <Div s='_fx_1'>
          <Input
            placeholder='请输入验证码'
            disabled={disabled}
            allowClear={true}
            maxLength={length}
            type='number'
            value={form.data[prop]}
            onChange={onInputChange}
          />
        </Div>
        {
          !time &&
          <Div s='_fs_12_B8B8B8' onPress={sendVerifyCode}>获取验证码</Div>
          ||
          <Div s='_fs_12_gray _fx_rc'>{time + '秒之后重试'}</Div>
        }
      </Div>
    </FormLabel>
  );
};
