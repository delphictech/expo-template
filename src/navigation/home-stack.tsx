import React from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeScreen, PickupSession, LoginScreen } from 'src/screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type HomeStackParams = {
  Main: undefined;
  PickupSession: undefined;
  Login: undefined;
};

const StackNav = createNativeStackNavigator<HomeStackParams>();

export const HomeStackNavigator: React.FC<HomeStackParams> = (props) => {
  const navigation = useNavigation();

  const checkPickup = () => {
    Alert.alert('Are you sure you want to end this session?', 'All members will be forced to leave and any games will be discontinued.', 
    [{ text: "Keep Playing", style: "cancel" },
    { text: "End the Session", onPress: navigation.goBack, style: "destructive"}],
    { cancelable: false })
  }

  const checkLogin = () => {
    Alert.alert('Are you sure you want to exit?', 'Your progress will not be saved.', 
                [{ text: "Exit", onPress: navigation.goBack, style: "destructive"},
                { text: "Return", onPress: () => console.log("Ask me later pressed"), style: "cancel" }],
                { cancelable: false })
  }

  return (
    <StackNav.Navigator >
      <StackNav.Screen name="Main" component={HomeScreen} 
        options={{ headerTitle: 'Home'}} />
      <StackNav.Screen
        name="PickupSession"
        component={PickupSession}
        options={{ 
          headerTitle: 'Play Pickup!', 
          headerRight: () => <MaterialCommunityIcons name="close" size={22} onPress={checkPickup}/>,
          presentation: 'fullScreenModal', gestureEnabled: false
        }}
      />
      <StackNav.Screen
        name="Login"
        component={LoginScreen}
        options={{ 
          headerTitle: 'Login or Sign Up', 
          headerRight: () => <MaterialCommunityIcons name="close" size={22} onPress={checkLogin}/>,
          presentation: 'modal'
        }}
      />
    </StackNav.Navigator>
  );
}
