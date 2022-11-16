import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, WelcomeScreen } from 'src/screens';

export type AuthStackParams = {
    Welcome?: undefined;
    Login: {
        signInMethods: Array<string>;
        email: string;
        title?: string;
        extra?: any;
    };
};

const StackNav = createNativeStackNavigator<AuthStackParams>();

export const AuthStackNavigator: React.FC<any> = () => {

    return (
        <StackNav.Navigator screenOptions={{ gestureEnabled: true }} initialRouteName="Welcome">
            <StackNav.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false, animationTypeForReplace: 'pop' }}
            />
            <StackNav.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </StackNav.Navigator>
    );
};
