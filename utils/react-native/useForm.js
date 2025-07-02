
import { useRef, useCallback } from 'react';
// 用法： const form = useForm({name: ''}); // 初始form
export default (defaultValue, defaultSetting = {}) => {
  const [formData, setFormData] = useState(defaultValue);
  
  const data = useRef(formData).current;
  const setData = useCallback(setFormData);
  const settings = useRef(defaultSetting).current; // 表单配置
  const rules = useRef({}).current; // 必须是用ref变量，不然在组件刷新的时候会重新初始化

  const set = (prop, value) => { // 设值
    data[prop] = value;
    setData({ ...data });
  };
  const setAll = (value) => { // 设所有值
    setData({ ...value });
  };
  const remove = (prop) => { // 删除一个值
    setData(_.omit(data, prop));
    delete rules[prop]; // 删除校验函数
  };
  const addRule = (prop, rule) => { // 添加校验函数
    rules[prop] = rule;
  };
  const validate = () => {
    for (const prop in rules) {
      if (!rules[prop]()) {
        return false;
      }
    }
    return true;
  }

  return { data, set, setAll, remove, addRule, validate, settings };
}
