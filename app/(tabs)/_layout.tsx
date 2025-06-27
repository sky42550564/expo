import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import CustomTabBar from '@/components/navigate/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      // tabBar={(props) => <CustomTabBar {...props} />} // 自定义的组件
      // https://reactnavigation.org/docs/bottom-tab-navigator/
      screenOptions={{
        tabBarButton: (props) => <TouchableOpacity {..._.omit(props, (o: any) => o == null)} />, // 禁用所有反馈,
        tabBarPosition: 'bottom', // tabbar的位置
        tabBarActiveTintColor: 'blue', // 高亮颜色
        tabBarInactiveTintColor: 'gray', // 失活颜色
        tabBarActiveBackgroundColor: 'white', // 失活背景颜色
        tabBarInactiveBackgroundColor: 'white', // 失活背景颜色
        headerShown: false,
        headerStyle: _u(`_bc_red`),
        tabBarStyle: _u(`_hm_64 _por`),
        tabBarItemStyle: _u('_bo_0'), // item的样式
        tabBarLabelPosition: 'below-icon', // 标签的位置
        tabBarLabelStyle: _u(`_fs_16`), // 标签的样式
        tabBarIconStyle: _u(`_mb_4`), // icon的样式
        tabBarBadgeStyle: _u(`_c_white _bc_green`), // badge的样式
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <Icon icon="checkmark-circle" color={color}></Icon>,
          tabBarBadge: 10, // 显示badge
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: '购物车',
          tabBarIcon: ({ color }) => <Icon icon="checkmark-circle" color={color}></Icon>,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Icon icon="scan-circle-outline" size={80} color={color}></Icon>,
          tabBarItemStyle: _u('_por'), // item的样式
          tabBarIconStyle: _u(`_poa_t-32_l-4 _r_80_white _bo`), // icon的样式
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: '订单',
          tabBarIcon: ({ color }) => <Icon icon="checkmark-circle" color={color}></Icon>,
        }}
      />
      <Tabs.Screen
        name="personal"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <Icon icon="checkmark-circle" color={color}></Icon>,
        }}
      />
    </Tabs>
  );
}
