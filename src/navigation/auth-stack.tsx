import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { LoginScreen, AuthEmail } from 'src/screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEvent } from 'react-native-reanimated';
import { ScreenParams } from 'src/types/screen';

export type AuthStackParams = {
    Email?: undefined;
    AuthEmail: {
        signInMethods: Array<string>;
        email: string;
        extra?: any;
    };
};

const StackNav = createNativeStackNavigator<AuthStackParams>();

export const AuthStackNavigator: React.FC<ScreenParams> = (props: ScreenParams) => {
    const navigation = useNavigation();
    useEffect(() => {
        console.log('Rendering');
    });

    return (
        <StackNav.Navigator screenOptions={{ gestureEnabled: true }} initialRouteName="Email">
            <StackNav.Screen
                name="Email"
                component={LoginScreen}
                options={{ headerShown: false, animationTypeForReplace: 'pop' }}
            />
            <StackNav.Screen
                name="AuthEmail"
                component={AuthEmail}
                options={{ headerShown: false }}
            />
        </StackNav.Navigator>
    );
};
