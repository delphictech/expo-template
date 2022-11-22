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
        <ProfileNav.Navigator>
            <ProfileNav.Screen
                name="Profile-Screen"
                component={ProfileScreen}
                options={{ headerShown: false, animationTypeForReplace: 'pop' }}
            />
            <ProfileNav.Screen
                name="Settings"
                component={EditProfileScreen}
                options={{ headerShown: false, animationTypeForReplace: 'pop' }}
            />
        </ProfileNav.Navigator>
    );
};
