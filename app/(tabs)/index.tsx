import { View, Image, Text } from 'react-native';
export default function Home() {
  const show = async () => { // 
  }
  const orderMenus = [
    {
      icon: require('@/assets/images/react-logo.png'),
      label: `待付款`,
      click: () => {
      },
    },
    {
      icon: require('@/assets/images/react-logo.png'),
      label: `待发货`,
      click: () => {
      },
    },
    {
      icon: require('@/assets/images/react-logo.png'),
      label: `待收货`,
      click: () => {
      },
    },
    {
      icon: require('@/assets/images/react-logo.png'),
      label: `待评价`,
      click: () => {
        console.log('=================123', 123);
      },
    },
    {
      icon: require('@/assets/images/react-logo.png'),
      label: `售后`,
      page: '/pages/personal'
    },
  ];
  const show1 = () => { // 
    $error('123123')
  }
  return (
    <View style={_u(`_p_0`)}>
      <View style={_u(`_s_100_red`)}></View>
      <Div onPress={show1} s="_button_white_warning_error_v_335_42_fs21_r _of_hidden">显示</Div>
      {/* <MenuGrid list={orderMenus} column={4} />
      <Icon icon="checkmark-circle"></Icon>
      <Icon icon={require('@/assets/images/react-logo.png')} onPress={show}></Icon>
      <Image source={require('@/assets/images/react-logo.png')} style={_u(`_s_100`)}></Image> */}
    </View>
  );
}
