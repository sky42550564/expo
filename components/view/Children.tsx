import React from 'react';
import { Text } from 'react-native';

export default ({
  children,
  fontStyle,
}: any) => {
  if (!children) return children;
  if (_.isArray(children)) {
    return children.map((o: any, i: number) => {
      if (React.isValidElement(o)) return o;
      if (_.isPlainObject(o))
        o = JSON.stringify(o);
      if (_.isString(o)) return <Text key={i} style={fontStyle}>{o}</Text>;
      return o;
    });
  }
  if (React.isValidElement(children)) return children;
  if (_.isPlainObject(children))
    children = JSON.stringify(children);
  if (_.isString(children)) return <Text style={fontStyle}>{children}</Text>;
  return children;
};
