import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from 'src/screens/settings';
import { ChangePasswordScreen } from 'src/screens/change-password';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type SettingStackParams = {
    settings: undefined;
    password: undefined;
};

const ProfileNav = createNativeStackNavigator<SettingStackParams>();

const CloseIcon = (onClose: () => void) => (
    <MaterialCommunityIcons name="close" size={22} onPress={onClose} />
);

type SettingsStackProps = StackScreenProps<SettingStackParams, 'settings'>;

export const SettingsStack: React.FC<SettingsStackProps> = ({ navigation }) => {

    return (
        <ProfileNav.Navigator>
            <ProfileNav.Screen
                name="settings"
                component={SettingsScreen}
                options={{ headerShown: false }}
            />
            <ProfileNav.Screen
                name="password"
                component={ChangePasswordScreen}
                options={{
                    headerTitle: 'Change Password',
                    // headerRight: () => CloseIcon(navigation.goBack),
                    presentation: 'modal',
                }}
            />
        </ProfileNav.Navigator>
    );
};
