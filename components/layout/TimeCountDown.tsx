// <TimeCountDown time={item.expectWorkTime} label='还有' outTimeLabel='已超期' showOutTime></TimeCountDown>
export default ({
  time,
  label, // 倒计时标签
  outTimeLabel, // 超期标签
  showOutTime = false, // 是否显示超期时间，如果不显示，只显示超期标签
  color = 'green', // 未超期后的字体颜色
  outTimeColor = 'red', // 超期后的字体颜色
  onTimeout, // 时间超期的回调
  timeStyle = false, // 是否以时间格式显示: 00:00:00
}: any) => {
  const [state, setState] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    isOutTime: false, // 是否超期
    isEnd: false,
  });

  const checkTime = () => {
    if (state.isEnd) return;
    let s = -(moment().diff(time, 's'));
    if (s <= 0) {
      state.isOutTime = true;
      onTimeout && onTimeout(); // 执行超时的回调
      s = -s;
    }
    if (!state.isOutTime || showOutTime) {
      state.day = Math.floor(s / 86400);
      s -= state.day * 86400;
      state.hour = Math.floor(s / 3600);
      s -= state.hour * 3600;
      state.minute = Math.floor(s / 60);
      state.second = s - state.minute * 60;
      setTimeout(checkTime, 1000);
    }
    setState({ ...state });
  }

  const pad = (n: number) => {
    return n < 10 ? '0' + n : n;
  }

  const stopTimer = () => { // 停止计时器
    state.isEnd = true;
    setState({ ...state });
  }

  useEffect(() => {
    checkTime();
    return () => {
      stopTimer();
    }
  }, []);

  return (
    <Div s={['_fx_r_ac']}>
      {(!!label && !state.isOutTime) && <Div s={[color && `_c_${color}`]}>{label}</Div>}
      {(!!outTimeLabel && state.isOutTime) && <Div s={[outTimeColor && `_c_${outTimeColor}`]}>{outTimeLabel}</Div>}
      {
        ((!state.isOutTime || showOutTime) && timeStyle) ?
          <Div s={[`_fx_r_ac`, (color && !state.isOutTime) && `_c_${color}`, (outTimeColor && state.isOutTime) && `_c_${outTimeColor}`]}>
            {`${state.day ? `${state.day}天` : ``}${pad(state.hour)}:${pad(state.minute)}:${pad(state.second)}`}
          </Div>
          : (!state.isOutTime || showOutTime) &&
          <Div s={[`_fx_r_ac`, (color && !state.isOutTime) && `_c_${color}`, (outTimeColor && state.isOutTime) && `_c_${outTimeColor}`]}>
            {`${state.day ? `${state.day}天` : ``}${state.day || state.hour ? `${state.hour}小时` : ``}${state.day || state.hour || state.minute ? `${state.minute}分钟` : ``}${state.second}秒`}
          </Div>
      }
    </Div>
  )
}
