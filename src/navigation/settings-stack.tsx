import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    SettingsScreen,
    ChangeEmailScreen,
    ChangePasswordScreen,
    DeleteAccountScreen,
} from 'src/screens';

export type SettingStackParams = {
    Settings: undefined;
    Password: undefined;
    Email: undefined;
    DeleteAccount: undefined;
};

const ProfileNav = createNativeStackNavigator<SettingStackParams>();

export /**
 * Settings Stack, used for navigating between settings and password screen
 *
 * @return {*}
 */
const SettingsStack: React.FC<{}> = () => {
    return (
        <ProfileNav.Navigator>
            <ProfileNav.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ headerShown: false }}
            />
            <ProfileNav.Screen
                name="Password"
                component={ChangePasswordScreen}
                options={{
                    headerTitle: 'Change Password',
                    presentation: 'modal',
                }}
            />
            <ProfileNav.Screen
                name="Email"
                component={ChangeEmailScreen}
                options={{
                    headerTitle: 'Change Email',
                    presentation: 'modal',
                }}
            />
            <ProfileNav.Screen
                name="DeleteAccount"
                component={DeleteAccountScreen}
                options={{
                    headerTitle: 'Delete Account',
                    presentation: 'modal',
                }}
            />
        </ProfileNav.Navigator>
    );
};
