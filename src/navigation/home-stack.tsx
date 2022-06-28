import React from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeScreen } from 'src/screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthStackNavigator } from './auth-stack';

export type HomeStackParams = {
    Home: undefined;
    Auth: undefined;
};

const StackNav = createNativeStackNavigator<HomeStackParams>();

const CloseIcon = (onClose: () => void) => (
    <MaterialCommunityIcons name="close" size={22} onPress={onClose} />
);

export const HomeStackNavigator: React.FC<any> = () => {
    const navigation = useNavigation();

    const checkLogin = () => {
        Alert.alert(
            'Are you sure you want to exit?',
            'Your progress will not be saved.',
            [
                { text: 'Exit', onPress: navigation.goBack, style: 'destructive' },
                {
                    text: 'Return',
                    onPress: () => null,
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <StackNav.Navigator>
            <StackNav.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Home' }} />
            <StackNav.Screen
                name="Auth"
                component={AuthStackNavigator}
                options={{
                    headerTitle: 'Login or Sign Up',
                    headerRight: () => CloseIcon(checkLogin),
                    presentation: 'modal',
                }}
            />
        </StackNav.Navigator>
    );
};
