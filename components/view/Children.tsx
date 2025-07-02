import React from 'react';
import { Text } from 'react-native';

export default ({
  children,
  fontStyle,
}: any) => {
  if (_.isArray(children)) {
    children = children.map((o: any) => _.isPlainObject(o) && !React.isValidElement(o) ? JSON.stringify(o): o);
  } else if (_.isPlainObject(children) && !React.isValidElement(children)) {
    children = JSON.stringify(children);
  }
  return _.isString(children) ? <Text style={fontStyle}>{children}</Text> : children;
};

