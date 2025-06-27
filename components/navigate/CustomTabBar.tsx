import { View } from 'react-native';

export default ({ state, descriptors, navigation }: any) => {
  const handlePress = (route: any) => {
    navigation.navigate(route.name);
  };

  return (
    <View style={_u(`_wf_64 _fx_rb`)}>
      {
        state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || route.name;
          const color = state.index === index ? 'red' : 'gray';
          return (
            <Div key={index} s="_fx_ccc" onPress={() => handlePress(route)}>
              <options.tabBarIcon color={color} />
              {label !== 'camera' && <Div s={_u(`_c_${color}`)}>{label}</Div>}
            </Div>
          )
        })
      }
    </View>
  );
};
