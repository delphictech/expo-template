import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreScreen } from 'src/screens';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { HomeStackNavigator } from './home-stack';

export type BottomTabParams = {
    HomeTab: undefined;
    Explore: undefined;
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

export const BottomTabNavigator: React.FC<any> = () => {
    return (
        <Tabs.Navigator>
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
        </Tabs.Navigator>
    );
};
