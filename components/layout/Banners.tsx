import { Carousel } from '@ant-design/react-native';

export default ({
  list,
  width = 375,
  height = 130,
  mode = 'cover'
}: any) => {


  return (
    <Carousel style={_u(`_s_${width}_${height}`)} autoplay infinite>
      {
        _.map(list, (o: any, i: any) => (
          <Img key={i} url={o} style={_u(`_s_${width}_${height}`)} mode={mode}></Img>
        ))
      }
    </Carousel>
  )
}
