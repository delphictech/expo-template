import React from 'react';
import { ColorSchemeName } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationLightTheme, navigationDarkTheme } from 'src/constants/theme';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackNavigator } from './auth-stack';
import { BottomTabNavigator } from './bottom-tab';

export interface RootParams {
    scheme?: ColorSchemeName; // the color scheme of the app
}

export type RootStackParams = {
    Main: undefined;
};

const StackNav = createNativeStackNavigator<RootStackParams>();

export /**
 * Root Navigator for navigating to Bottom Tab Navigator if signed in and Auth Stack if signed out
 *
 * @param {*} { scheme }
 * @return {*}
 */
const RootNavigator: React.FC<RootParams> = ({ scheme }) => {
    // redux handlers
    const loggedIn = useAppSelector((state) => state.user.loggedIn);

    return (
        <NavigationContainer theme={scheme === 'dark' ? navigationDarkTheme : navigationLightTheme}>
            <StackNav.Navigator>
                <StackNav.Screen
                    name="Main"
                    component={loggedIn ? BottomTabNavigator : AuthStackNavigator}
                    options={{ headerShown: false }}
                />
            </StackNav.Navigator>
        </NavigationContainer>
    );
};

RootNavigator.defaultProps = {
    scheme: 'light',
};
