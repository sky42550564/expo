import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default ({
  children,
  onChange,
  model = [false], // 双向绑定， [value, setValue]
  size = 24, // 大小
  activeColor = '#1677ff', // 选中的颜色
  inactiveColor = '#d1d1d1', // 未选中的颜色
  s, // 样式，类格式
  style, // 样式
}: any) => {
  const [checked, setChecked] = useState(model[0]);
  const onPress = () => {
    const newValue = !checked;
    setChecked(newValue);
    model[1] && model[1](newValue);
    onChange && onChange(newValue);
  };
  const st = style || _u(s);
  const { color, fontSize, fontWeight, lineHeight, ...otherStyle } = st;
  const fontStyle = { color, fontSize, lineHeight: lineHeight * 0.7, fontWeight }; // 字体样式
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[_u(`_fx_r`), otherStyle]}>
      <MaterialCommunityIcons name={checked ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'} size={size} color={checked ? activeColor : inactiveColor} style={_u(`_mr_6`)} />
      {_.isString(children) ? <Text style={fontStyle}>{children}</Text> : children}
    </TouchableOpacity>
  );
};

