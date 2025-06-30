import type { PropsWithChildren } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { View, Image, ImageBackground, Text, TouchableOpacity } from 'react-native';

/*
例子：
 <Img style={_u(`_w_200`)} url={require('@/assets/images/goods.png')} mode="width"></Img>
*/
type Props = PropsWithChildren<{
  onPress?: (event: GestureResponderEvent) => void; // 点击事件
  url: any; // icon
  s?: string; // 样式，类格式，必须遵循@/utils/libs/uno.js的定义
  mode?: string; // 填充类型：stretch, cover, contain, width, height，如果是width的时候，style一定要指定width, 如果是height的时候，style一定要指定height
  style?: object, // 样式
}>;


export default function Img({
  children, // 子组件
  onPress, // 点击事件
  url, // 如果http:或data:开头 或有uri属性
  s, // 样式，类格式
  style, // 样式
  mode,
}: Props) {
  const [resizeMode, setResizeMode] = useState(mode);
  const [imageStyle, setImageStyle] = useState(null);
  const [fontStyle, setFontStyle] = useState(null);
  const [childStyle, setChildStyle] = useState(null);
  const [source, setSource] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const st = style || _u(s);
    const { color, fontSize, fontWeight, lineHeight, ..._otherStyle } = st;
    const { flexDirection, justifyContent, alignItems, flexWrap, gap, ...otherStyle } = _otherStyle;
    setFontStyle({ color, fontSize, lineHeight, fontWeight }); // 字体样式
    setChildStyle({ flexDirection, justifyContent, alignItems, flexWrap, gap }); // child样式
    const src = (_.startsWith(url, 'http://') || _.startsWith(url, 'https://') || _.startsWith(url, 'data:')) ? { uri: url } : url;
    console.log('=================src', src);
    setSource(src);
    if (mode === 'width' || mode === 'height') { // 如果是限制宽或者高，则需要计算图片的大小
      setResizeMode('stretch');
      const resolvedSource = _.isNumber(src) ? Image.resolveAssetSource(src) : src;
      Image.getSize(resolvedSource.uri, (w, h) => {
        if (mode === 'width') {
          setImageStyle({ height: (otherStyle.width * h / w) || undefined, ...otherStyle });
        } else {
          setImageStyle({ width: (otherStyle.height * w / h) || undefined, ...otherStyle });
        }
        setVisible(true);
      });
    } else {
      setResizeMode(mode);
      setImageStyle(otherStyle);
      setVisible(true);
    }
  }, [s, style, url, mode]);

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[_u(`_bc_white _por`), imageStyle]}>
        {visible && <ImageBackground source={source} resizeMode={resizeMode} style={[childStyle, _u(`_w_100% _h_100%`)]}>
          {_.isString(children) ? <Text style={fontStyle}>{children}</Text> : children}
        </ImageBackground>}
      </TouchableOpacity>
    )
  }
  return (
    <View style={[_u(`_bc_white _por`), imageStyle]}>
      {visible && <ImageBackground source={source} resizeMode={resizeMode} style={[childStyle, _u(`_w_100% _h_100%`)]}>
        {_.isString(children) ? <Text style={fontStyle}>{children}</Text> : children}
      </ImageBackground>}
    </View>
  )
}
