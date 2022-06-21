import React from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenParams } from 'src/types/screen';
import { AuthStackNavigator } from './auth-stack';
import { BottomTabNavigator } from './bottom-tab';

export type MainStackParams = {
    Main: undefined;
    Auth: undefined;
};

const StackNav = createNativeStackNavigator<MainStackParams>();

export const MainStackNavigator: React.FC<ScreenParams> = (props: ScreenParams) => {
    /*
    This stack navigator will add the login modal that can pop up from wherever in the app, 
    if the user does certain actions that require an account
  */
    const navigation = useNavigation();

    const checkLogin = () => {
        Alert.alert(
            'Are you sure you want to exit?',
            'Your progress will not be saved.',
            [
                { text: 'Exit', onPress: navigation.goBack, style: 'destructive' },
                {
                    text: 'Return',
                    onPress: () => console.log('Ask me later pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <StackNav.Navigator id="MainStackNavigator">
            <StackNav.Screen
                name="Main"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <StackNav.Screen
                name="Auth"
                component={AuthStackNavigator}
                options={{
                    headerTitle: 'Login or Sign Up',
                    headerRight: () => (
                        <MaterialCommunityIcons name="close" size={22} onPress={checkLogin} />
                    ),
                    presentation: 'modal',
                }}
            />
        </StackNav.Navigator>
    );
};
