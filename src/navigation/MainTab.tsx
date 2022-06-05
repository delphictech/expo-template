import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ExploreScreen, LoginScreen, SignupScreen } from 'screens';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export type MainTabParams = {
  Home: undefined;
  Explore: undefined;
};

const Tabs = createBottomTabNavigator<MainTabParams>();

export default function MainTabNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={SignupScreen} 
        options={{ headerTitle: 'Home', 
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={36}/>
          ),
        }} />
      <Tabs.Screen
        name="Explore"
        component={LoginScreen}
        options={{ headerTitle: 'Explore', 
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name={"search"}
              color={color}
              size={36}/>
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
