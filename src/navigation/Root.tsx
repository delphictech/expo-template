import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from 'src/hooks/useful-ducks';
import { MainStackNavigator } from './main';
import { AuthStackNavigator } from './auth-stack';

export default function RootNavigator() {
    // redux handlers
    const loggedIn = useAppSelector((state) => state.user.loggedIn);

    return (
        <NavigationContainer>
            {loggedIn ? <MainStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
}
