import React from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeScreen, PickupSession } from 'src/screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type HomeStackParams = {
  Main: undefined;
  PickupSession: undefined;
};

const StackNav = createNativeStackNavigator<HomeStackParams>();

export const HomeStackNavigator: React.FC<HomeStackParams> = (props) => {
  const navigation = useNavigation();

  const checkClose = () => {
    Alert.alert('Are you sure you want to end this session?', 'All members will be forced to leave and any games will be discontinued.', 
    [{ text: "Keep Playing", style: "cancel" },
    { text: "End the Session", onPress: navigation.goBack, style: "destructive"}],
    { cancelable: false })
  }

  return (
    <StackNav.Navigator screenOptions={{presentation: 'fullScreenModal', gestureEnabled: false}} >
      <StackNav.Screen name="Main" component={HomeScreen} 
        options={{ headerTitle: 'Home'}} />
      <StackNav.Screen
        name="PickupSession"
        component={PickupSession}
        options={{ headerTitle: 'Play Pickup!', headerRight: () => <MaterialCommunityIcons name="close" size={22} onPress={checkClose}/>}}
      />
    </StackNav.Navigator>
  );
}
