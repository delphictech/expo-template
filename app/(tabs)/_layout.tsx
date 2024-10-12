import { Tabs, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable } from 'react-native';

import { TabBarIcon } from '~/components/navigation/TabBarIcon';
import { Colors } from '~/constants/Colors';
import { useColorScheme } from '~/hooks/useColorScheme';
import { useAppSelector } from '~/redux/useful-hooks';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // const navigation = useNavigation();
  const router = useRouter();

    // redux handlers
  const user = useAppSelector((state) => state.user.loggedIn);

  // useEffect(() => {
  //   if (!user) {
  //     navigation.navigate('/login');
  //   }
  // }, [user]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'earth' : 'earth-outline'} color={color} />
          ),
        }}
      />

       <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() => {
                if (user) {
                  router.push('/profile');
                } else {
                  router.push('/login');
                }
              }}
            >
              {props.children}
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
