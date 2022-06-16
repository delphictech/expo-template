import React from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LoginScreen, PasswordScreen } from 'src/screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LoginModalProps } from 'src/components/modals';

export type AuthStackParams = {
  Email?: undefined;
  Password?: undefined;
};

const StackNav = createNativeStackNavigator<AuthStackParams>();

export const AuthStackNavigator: React.FC<AuthStackParams> = (props) => {

  const LoginScreenComp = () => (
    <LoginScreen key='InitialLogin' main />
  );

  const navigation = useNavigation();

  return (
    <StackNav.Navigator screenOptions={{gestureEnabled: false, headerShown: false}} >
      <StackNav.Screen name="Email" component={LoginScreenComp} 
        options={{ headerTitle: 'Home'}} />
      <StackNav.Screen
        name="Password"
        component={PasswordScreen}
        options={{ headerTitle: 'Enter Password'}}
      />
    </StackNav.Navigator>
  );
}
