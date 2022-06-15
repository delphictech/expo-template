import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './MainTab';
import { LoginScreen } from 'src/screens';
import { useAppSelector } from 'src/hooks/useful-ducks';

export default function RootNavigator() {

  // redux handlers
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  return (
    <NavigationContainer>
      {
        loggedIn ? 
          <MainTabNavigator/>
          : <LoginScreen safeArea centered title />
      }
      
    </NavigationContainer>
  );
}
