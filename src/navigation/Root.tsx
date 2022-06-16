import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './main';
import { AuthStackNavigator } from './auth-stack';
import { useAppSelector } from 'src/hooks/useful-ducks';

export default function RootNavigator() {

  // redux handlers
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  

  return (
    <NavigationContainer>
      { loggedIn ?
          <MainStackNavigator />
        : <AuthStackNavigator />
      }
    </NavigationContainer>
    
  );
}
