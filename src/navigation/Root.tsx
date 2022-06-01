import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ExploreScreen } from 'screens';

export type MainTabParams = {
  Home: undefined,
  Explore: undefined
};

const MainTab = createBottomTabNavigator<MainTabParams>();

export default function RootNavigator() {

  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
      />
      <MainTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ headerTitle: 'Explore' }}
      />
    </MainTab.Navigator>
  );
}
