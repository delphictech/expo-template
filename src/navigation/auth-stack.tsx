import React from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { LoginScreen, AuthScreen } from 'src/screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LoginModalProps } from 'src/components/modals';

export type AuthStackParams = {
  Email?: undefined;
  Auth?: undefined;
};

const StackNav = createNativeStackNavigator<AuthStackParams>();

export const AuthStackNavigator: React.FC<AuthStackParams> = (props) => {

  const navigation = useNavigation();

  return (
    <StackNav.Navigator screenOptions={{gestureEnabled: false}} >
      <StackNav.Screen name="Email" component={LoginScreen} 
        options={{ headerShown: false}} />
      <StackNav.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerTitle: 'Enter Password'}}
      />
    </StackNav.Navigator>
  );
}
