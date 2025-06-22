import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => '123',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: '购物车',
          tabBarIcon: ({ color }) => '123',
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: '订单',
          tabBarIcon: ({ color }) => '123',
        }}
      />
      <Tabs.Screen
        name="personal"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => '123',
        }}
      />
    </Tabs>
  );
}
