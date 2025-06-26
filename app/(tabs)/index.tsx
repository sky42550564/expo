import { View, Image, Text } from 'react-native';
export default function Home() {
  const show = async () => { // 
  }
  const orderMenus = [
    {
      icon: _img('logo.png'),
      label: `待付款`,
      click: () => {
      },
    },
    {
      icon: _img('logo.png'),
      label: `待发货`,
      click: () => {
      },
    },
    {
      icon: _img('logo.png'),
      label: `待收货`,
      click: () => {
      },
    },
    {
      icon: _img('logo.png'),
      label: `待评价`,
      click: () => {
        console.log('=================123', 123);
      },
    },
    {
      icon: _img('logo.png'),
      label: `售后`,
      page: '/pages/personal'
    },
  ];
  console.log('=================', _img('logo.png'));
  return (
    <View style={_u(`_p_0`)}>
      <View style={_u(`_s_100_red`)}></View>
      <MenuGrid list={orderMenus} column={4} />
      <Icon icon="checkmark-circle"></Icon>
      <Icon icon={_img('logo.png')} onPress={show}></Icon>
      <Image source={_img('logo.png')} style={_u(`_s_100`)}></Image>
    </View>
  );
}
