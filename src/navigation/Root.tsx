import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { navigationLightTheme, navigationDarkTheme } from 'src/constants/theme';
import { useAppSelector } from 'src/hooks/useful-ducks';
import { MainStackNavigator } from './main';
import { AuthStackNavigator } from './auth-stack';

export interface RootParams {
    scheme?: string; // the color scheme of the app
};

export const RootNavigator: React.FC<RootParams> = (props) => {
    // redux handlers
    const loggedIn = useAppSelector((state) => state.user.loggedIn);

    return (
        <NavigationContainer theme={props.scheme === 'dark' ? navigationDarkTheme : navigationLightTheme}>
            {loggedIn ? <MainStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
}
