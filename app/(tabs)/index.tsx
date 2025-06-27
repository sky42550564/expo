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
    <View style={_u(`_pt_50 _ph_10`)}>
      <MenuTitle title="我的订单" subTitle="全部订单" arrowCount={2} onClick={show1} />
      <MenuItem list={orderMenus} column={4} />
    </View>
  );
}
