import { Text } from 'react-native';
export default ({
  children, // 子组件
  form, // 表单引用
  label, // 标签
  prop, // 字段名称
  labelLeft, // 标签的左边宽度
  labelWidth, // 标签的宽度
  labelRight, // 标签的右边宽度
  noLabel = false, // 不显示标签
  rules, // 规则
  required, // 必选
  unit, // 单位
  topSep, // 上面有分割线
  bottomSep, // 下面有分割线
  showFull = false, // 是否分行展示，标签在上一行，表单在下一行
  showRight = false, // 右边展示，可以在form上统一设置
  showLine = false, // 显示下划线，可以在form上统一设置
  hasColon = true, // 是否有冒号
  hasSpace = false, // 标签栏等距分开
  hasBorder = false, // 输入框是否有下划线
  needAlert = false, // 是否需要弹出错误框
}: any) => {
  const [state, setState] = useState({
    _showRight: showRight,
    _showFull: showFull,
    _showLine: showLine,
    _labelLeft: labelLeft,
    _labelWidth: labelWidth,
    _labelRight: labelRight,
    _hasColon: hasColon,
    _hasSpace: hasSpace,
    _hasBorder: hasBorder,
    _needAlert: needAlert,
  });

  const validate = () => {
    const value = form.data[prop];
    const requiredRule = _.find(rules, (o: any) => o.required === true);
    if (requiredRule && (value === '' || value == null)) { // 有必填的判断，但是空值的时候
      state._needAlert ? $alert(requiredRule.message): $error(requiredRule.message);
      return false;
    }
    for (const rule of rules) {
      if (rule.required) continue;
      let errorMessage;
      rule.validator(rule, value, (err: any) => errorMessage = err);
      if (errorMessage) {
        state._needAlert ? $alert(errorMessage): $error(errorMessage);
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    form.settings.showFull != undefined && (state._showFull = form.settings.showFull); // 是否分行展示，标签在上一行，表单在下一行
    form.settings.showRight != undefined && (state._showRight = form.settings.showRight); // 右边展示
    form.settings.showLine != undefined && (state._showLine = form.settings.showLine); // 显示下划线
    form.settings.labelLeft != undefined && (state._labelLeft = form.settings.labelLeft); // 标签的左边宽度
    form.settings.labelWidth != undefined && (state._labelWidth = form.settings.labelWidth); // 标签的宽度
    form.settings.labelRight != undefined && (state._labelRight = form.settings.labelRight); // 标签的右边宽度
    form.settings.hasColon != undefined && (state._hasColon = form.settings.hasColon); // 是否有冒号
    form.settings.hasSpace != undefined && (state._hasSpace = form.settings.hasSpace); // 标签栏等距分开
    form.settings.hasBorder != undefined && (state._hasBorder = form.settings.hasBorder); // 输入框是否有下划线
    form.settings.needAlert != undefined && (state._needAlert = form.settings.needAlert); // 输入框是否有下划线
    setState({ ...state });
    form.addRule(prop, validate); // 挂载的时候向父级添加prop
    return () => {
      // 挂卸载的时候删除prop
      form.remove(prop);
    }
  }, []);

  return (
    <Div s={[state._showFull ? `_fx_cc` : ``, state._showLine ? `_bob_f0f0f0` : `_wf`]}>
      <Div s={[`_ph_8 _hmin_46 _fx_r_ac`, topSep && `_mt_10`, bottomSep && `_mb_10`]}>
        {/* 标签栏 */}
        <Div s='_fx_r'>
          <Div s={state._labelLeft && `_wm_${state._labelLeft}`}></Div>
          {
            (!noLabel && label && state._hasSpace) ?
              <Div s={['_fs_14_3d3d3d_400 _nowrap _fx_rb', state._labelWidth && `_wm_${state._labelWidth}`]}>{_.map(label, (ch: any, i: any) => (<Text key={i}>{ch}</Text>))}{state._hasColon ? '：' : ''}</Div>
              : (!noLabel && label) ?
                <Div s={['_fs_14_3d3d3d_400 _nowrap _fx_r', state._labelWidth && `_wm_${state._labelWidth}`]}><Div>{label}</Div>{state._hasColon ? '：' : ''}</Div> : null
          }
          <Div s={state._labelRight && `_wm_${state._labelRight}`}></Div>
        </Div>
        {
          // 左边展示
          (!state._showFull && !state._showRight) ?
            <Div s='_fx_r_1 _por'>
              {children}
              {unit && <Div s='_fs_12_red'>{{ unit }}</Div>}{/* 单位 */}
              {(!state._showLine && state._hasBorder) && <Div s='_bob_f0f0f0 _poa_l0_b-10 _wf'></Div>}{/* 下划线 */}
            </Div>
            : !state._showFull ?
              // 右边展示
              <Div s='_fx_r_1 _por _fx_r_je'>
                {children}
                {unit && <Div s='_fs_12_red'>{{ unit }}</Div>}{/* 单位 */}
                {(!state._showLine && state._hasBorder) && <Div s='_bob_f0f0f0 _poa_l0_b-10 _wf'></Div>}{/* 下划线 */}
              </Div>
              : null
        }
      </Div>
      {
        // 分行展示
        state._showFull &&
        <Div s='_fx_r'>
          {children}
          {unit && <Div s='_fs_12_red _ml_10'>{unit}</Div>}
        </Div>
      }
    </Div>
  );
};
