import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';

export default (Page: ComponentType<any>) => {
  return (props: any) => {
    const navigation = useNavigation();
    useEffect(() => { // 组件加载的时候动态设置导航栏
      navigation.setOptions({
        headerTitle: router.title,
        headerLeft: router.headerLeft,
        headerRight: router.headerRight,
      });
    }, []);
    return <Page {...props} {...router.passProps} />
  }
}
