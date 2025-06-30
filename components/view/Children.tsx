import { Text } from 'react-native';;

export default ({
  children,
  fontStyle,
}: any) => {
  if (_.isArray(children) && _.every(children, (o: any) => _.isString(o))) {
    children = children.join('');
  }
  return _.isString(children) ? <Text style={fontStyle}>{children}</Text> : children;
};

