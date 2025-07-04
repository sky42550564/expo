import React from 'react';
import { Text } from 'react-native';

export default ({
  children,
  fontStyle,
}: any) => {
  return React.Children.map(children, (child: any) => {
    if (React.isValidElement(child)) {
      let props: any = child.props || {};
      const style = { ...fontStyle, ...props?.style };
      return React.cloneElement(child, { ...props, style } as any);
    }
    if (_.isPlainObject(child)) child = JSON.stringify(child);
    if (_.isString(child)) return <Text style={fontStyle}>{child}</Text>;
    return child;
  });
};
