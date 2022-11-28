import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreScreen } from 'src/screens';
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { ProfileStack } from './profile-stack';
import { HomeStackNavigator } from './home-stack';

export type BottomTabParams = {
    HomeTab: undefined;
    Explore: undefined;
    Profile: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabParams>();

/*
    Define Icons
*/
interface TabBarIconProps {
    focused: boolean;
    color: string;
    size: number;
}
const HomeIcon = ({ focused, color, size }: TabBarIconProps) => (
    <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} color={color} size={size} />
);

const ExploreIcon = ({ focused, color, size }: TabBarIconProps) => (
    <MaterialIcons name={focused ? 'search' : 'search'} color={color} size={size} />
);

const ProfileIcon = ({ focused, color, size }: TabBarIconProps) => (
    <AntDesign name={focused ? 'user' : 'user'} color={color} size={size} />
);

export const BottomTabNavigator: React.FC<{}> = () => {
    const user = useAppSelector((state) => state.user);
    return (
        <Tabs.Navigator screenOptions={{ tabBarHideOnKeyboard: true }}>
            <Tabs.Screen
                name="HomeTab"
                component={HomeStackNavigator}
                options={{
                    title: 'Home',
                    headerTitle: 'Home',
                    headerShown: false,
                    tabBarIcon: HomeIcon,
                }}
            />
            <Tabs.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    headerTitle: 'Explore',
                    tabBarIcon: ExploreIcon,
                }}
            />
            {!user.isAnonymous && (
                <Tabs.Screen
                    name="Profile"
                    component={ProfileStack}
                    options={{
                        headerTitle: 'Profile-Stack-Screen',
                        headerShown: false,
                        tabBarIcon: ProfileIcon,
                    }}
                />
            )}
        </Tabs.Navigator>
    );
};
