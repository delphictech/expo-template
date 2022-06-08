import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, ExploreScreen } from 'screens';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export type HomeStackParams = {
  Main: undefined;
  PickupSession: undefined;
};

const StackNav = createNativeStackNavigator<HomeStackParams>();

export const HomeStackNavigator: React.FC<HomeStackParams> = (props) => {
  return (
    <StackNav.Navigator>
      <StackNav.Screen name="Main" component={HomeScreen} 
        options={{ headerTitle: 'Home',
        }} />
      <StackNav.Screen
        name="PickupSession"
        component={ExploreScreen}
        options={{ headerTitle: 'Pickup'}}
      />
    </StackNav.Navigator>
  );
}
