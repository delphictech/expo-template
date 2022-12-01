import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from 'src/screens/settings';
import { SettingsPassScreen } from 'src/screens/settings-pass';

export type SettingStackParams = {
    'Setting-Screen': undefined;
    'Setting-Pass-Screen': undefined;
};

const ProfileNav = createNativeStackNavigator<SettingStackParams>();

export const SettingseStack: React.FC<{}> = () => {
    return (
        <ProfileNav.Navigator>
            <ProfileNav.Screen
                name="Setting-Screen"
                component={SettingsScreen}
                options={{ headerShown: false, animationTypeForReplace: 'pop' }}
            />
            <ProfileNav.Screen
                name="Setting-Pass-Screen"
                component={SettingsPassScreen}
                options={{ headerShown: false, animationTypeForReplace: 'pop' }}
            />
        </ProfileNav.Navigator>
    );
};
