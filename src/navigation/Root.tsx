import React from 'react';
import { ColorSchemeName } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationLightTheme, navigationDarkTheme } from 'src/constants/theme';
import { useAppSelector } from 'src/hooks/useful-ducks';
import { MainStackNavigator } from './main';
import { AuthStackNavigator } from './auth-stack';

export interface RootParams {
    scheme?: ColorSchemeName; // the color scheme of the app
}

export const RootNavigator: React.FC<RootParams> = ({ scheme }) => {
    // redux handlers
    const loggedIn = useAppSelector((state) => state.user.loggedIn);

    return (
        <NavigationContainer theme={scheme === 'dark' ? navigationDarkTheme : navigationLightTheme}>
            {loggedIn ? <MainStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
};

RootNavigator.defaultProps = {
    scheme: 'light',
};
