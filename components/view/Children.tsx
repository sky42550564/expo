import React from 'react';
import { Text } from 'react-native';

export default ({
  children,
  fontStyle,
}: any) => {
  if (!children) return children;
  if (_.isArray(children)) {
    return children.map((o: any, i: number) => {
      if (React.isValidElement(o)) {
        const props: any = o.props || {};
        const style = { ...fontStyle, ...props?.style };
        return React.cloneElement(o, _.omitNil({ ...props, style, key: o.key || i }));
      }
      if (_.isPlainObject(o)) o = JSON.stringify(o);
      if (_.isString(o)) return <Text key={i} style={fontStyle}>{_t(o)}</Text>;
      return o;
    });
  }
  if (React.isValidElement(children)) {
    const props: any = children.props || {};
    const style = { ...fontStyle, ...props?.style };
    return React.cloneElement(children, { ...props, style });
  }
  if (_.isPlainObject(children)) children = JSON.stringify(children);
  if (_.isString(children)) return <Text style={fontStyle}>{_t(children)}</Text>;
  return children;
};
