import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { LoginScreen, AuthScreen } from 'src/screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEvent } from 'react-native-reanimated';

export type AuthStackParams = {
  Email?: undefined;
  Auth?: undefined;
};

const StackNav = createNativeStackNavigator<AuthStackParams>();

export const AuthStackNavigator: React.FC<AuthStackParams> = (props) => {

  const navigation = useNavigation();
  useEffect(() => {
    console.log('Rendering');
  });
  
  return (
    <StackNav.Navigator screenOptions={{gestureEnabled: true}} >
      <StackNav.Screen name="Email" component={LoginScreen} 
        options={{ headerShown: false, animationTypeForReplace: 'pop'}} />
      <StackNav.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerTitle: 'Enter Password'}}
      />
    </StackNav.Navigator>
  );
}
