import React from 'react';
import { Alert, GestureResponderEvent } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from 'src/screens';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Icon, IconButton } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { AuthStackNavigator } from './auth-stack';
import { SettingsStack } from './settings-stack';

export type HomeStackParams = {
    Home: undefined;
    SettingsStack: undefined;
    Auth: undefined;
};

const StackNav = createNativeStackNavigator<HomeStackParams>();

const CloseIcon = (onClose: () => void) => (
    <MaterialCommunityIcons name="close" size={22} onPress={onClose} />
);

const SettingsButton = (onPress?: (event: GestureResponderEvent) => void, isDisabled?: boolean) => (
    <IconButton
        isDisabled={isDisabled}
        alignSelf="flex-end"
        variant="unstyled"
        icon={<Icon as={MaterialIcons} name="settings" size="lg" color="primary.700" />}
        onPress={isDisabled ? null : onPress}
    />
);

type HomeStackProps = StackScreenProps<HomeStackParams, 'Home'>;

export /**
 * Home Stack Navigator, used for navigating between, home, auth, and settings screen
 *
 * @param {*} { navigation }
 * @return {*}
 */
const HomeStackNavigator: React.FC<HomeStackProps> = ({ navigation }) => {
    const isAnonymous = useAppSelector((state) => state.user.isAnonymous);
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
            <StackNav.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: 'Home',
                    headerRight: () =>
                        SettingsButton(() => navigation.navigate('SettingsStack'), isAnonymous),
                }}
            />
            <StackNav.Screen
                name="SettingsStack"
                component={SettingsStack}
                options={{ headerTitle: 'Settings', animationTypeForReplace: 'pop' }}
            />
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
