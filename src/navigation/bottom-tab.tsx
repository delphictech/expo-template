import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ExploreScreen } from 'src/screens';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ScreenParams } from 'src/types/screen';
import { HomeStackNavigator } from './home-stack';

export type BottomTabParams = {
    HomeTab: undefined;
    Explore: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabParams>();

export const BottomTabNavigator: React.FC<ScreenParams> = (props: ScreenParams) => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen
                name="HomeTab"
                component={HomeStackNavigator}
                options={{
                    headerTitle: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'home' : 'home-outline'}
                            color={color}
                            size={36}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    headerTitle: 'Explore',
                    tabBarIcon: ({ focused, color }) => (
                        <MaterialIcons name="search" color={color} size={36} />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};
