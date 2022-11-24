import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from 'src/screens/profile-screen/profile-screen';
import { EditProfileScreen } from 'src/screens/profile-screen/edit-profile-screen';

export type ProfileStackParams = {
    'Profile-Screen': undefined;
    Settings: undefined;
};

const ProfileNav = createNativeStackNavigator<ProfileStackParams>();

export const ProfileStack: React.FC<{}> = () => {
    return (
        <ProfileNav.Navigator screenOptions={{ gestureEnabled: true }}>
            <ProfileNav.Screen
                name="Profile-Screen"
                component={ProfileScreen}
                options={{ animationTypeForReplace: 'pop' }}
            />
            <ProfileNav.Screen
                name="Settings"
                component={EditProfileScreen}
                options={{ animationTypeForReplace: 'pop' }}
            />
        </ProfileNav.Navigator>
    );
};
