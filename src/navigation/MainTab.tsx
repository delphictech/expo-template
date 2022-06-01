import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ExploreScreen, LoginScreen, SignupScreen } from 'screens';

export type MainTabParams = {
  Home: undefined;
  Explore: undefined;
};

const Tabs = createBottomTabNavigator<MainTabParams>();

export default function MainTabNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={SignupScreen} options={{ headerTitle: 'Home' }} />
      <Tabs.Screen
        name="Explore"
        component={LoginScreen}
        options={{ headerTitle: 'Explore' }}
      />
    </Tabs.Navigator>
  );
}
