import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, WelcomeScreen } from 'src/screens';

export type AuthStackParams = {
    Email?: undefined;
    AuthEmail: {
        signInMethods: Array<string>;
        email: string;
        extra?: any;
    };
};

const StackNav = createNativeStackNavigator<AuthStackParams>();

export const AuthStackNavigator: React.FC<any> = () => {

    return (
        <StackNav.Navigator screenOptions={{ gestureEnabled: true }} initialRouteName="Email">
            <StackNav.Screen
                name="Email"
                component={WelcomeScreen}
                options={{ headerShown: false, animationTypeForReplace: 'pop' }}
            />
            <StackNav.Screen
                name="AuthEmail"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </StackNav.Navigator>
    );
};
