import React from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeScreen, PickupScreen, LoginScreen } from 'src/screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenParams } from 'src/types/screen';

export type HomeStackParams = {
    Home: undefined;
    PickupSession: undefined;
};

const StackNav = createNativeStackNavigator<HomeStackParams>();

export const HomeStackNavigator: React.FC<ScreenParams> = (props: ScreenParams) => {
    const navigation = useNavigation();

    const checkPickup = () => {
        Alert.alert(
            'Are you sure you want to end this session?',
            'All members will be forced to leave and any games will be discontinued.',
            [
                { text: 'Keep Playing', style: 'cancel' },
                { text: 'End the Session', onPress: navigation.goBack, style: 'destructive' },
            ],
            { cancelable: false },
        );
    };

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
        <StackNav.Navigator>
            <StackNav.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Home' }} />
            <StackNav.Screen
                name="PickupSession"
                component={PickupScreen}
                options={{
                    headerTitle: 'Play Pickup!',
                    headerRight: () => (
                        <MaterialCommunityIcons name="close" size={22} onPress={checkPickup} />
                    ),
                    presentation: 'fullScreenModal',
                    gestureEnabled: false,
                }}
            />
        </StackNav.Navigator>
    );
};
