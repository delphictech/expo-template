import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Text } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppSelector } from 'src/hooks/useful-ducks';
import { signOutUser } from 'src/firebase/api';
import { HomeStackParams } from 'src/navigation/home-stack';
import { ScreenParams } from 'src/types/screen';

/*
    Define Screen Typee
*/
type HomeScreenProps = StackNavigationProp<HomeStackParams, 'Home'>;

export const HomeScreen: React.FC<ScreenParams> = (props: ScreenParams) => {
    // navigation
    const navigation = useNavigation<HomeScreenProps>();

    // redux handlers
    const loggedIn = useAppSelector((state) => state.user.loggedIn);
    const isAnonymous = useAppSelector((state) => state.user.isAnonymous);
    const user = useAppSelector((state) => state.user);
    console.log(`Anonymous In: ${isAnonymous}`);

    // handling button functions
    const handleLoginButton = async () => {
        if (loggedIn) {
            const res = await signOutUser();
            console.log('SIgned out');
            console.log(res);
        } else {
            navigation.getParent('MainStackNavigator')?.navigate('Auth');
        }
    };

    return (
        <Box w="100%" h="100%" bgColor="background.100" flex={1} alignItems="center"
        justifyContent="center" >
            <Text color="plainText.800">Home Screen: {user.email}</Text>
            <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => navigation.getParent('MainStackNavigator')?.navigate('Auth')}>
                Login to real account
            </Button>
            <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => navigation.navigate('PickupSession')}>
                Start Pickup Session
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={handleLoginButton}>
                {loggedIn ? 'Logout' : 'Login'}
            </Button>
        </Box>
    );
};
