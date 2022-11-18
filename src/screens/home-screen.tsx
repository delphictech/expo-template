import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Text } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from 'src/ducks/useful-hooks';
import { incrementCount, decrementCount } from 'src/ducks/user-slice';
import { HomeStackParams } from 'src/navigation/home-stack';
import { useLazySignOutQuery } from 'src/services';

/**
 * Stack Navigation Prop for accessing screen navigation prop
 */
type HomeScreenProps = StackNavigationProp<HomeStackParams, 'Home'>;

/**
 * Home screen, will display basic data to the user
 *
 * @return {*}
 */
export const HomeScreen: React.FC<{}> = () => {
    // hooks
    const navigation = useNavigation<HomeScreenProps>();
    const [signOut, { isFetching, isError, error }] = useLazySignOutQuery();

    // redux handlers
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    // handling button functions
    const handleLoginButton = async () => {
        user.loggedIn ? signOut(undefined) : navigation.navigate('Auth');
    };

    useEffect(() => {
        // update the count if it has changed
        const initialCount = user.count;

        return () => {};
    });

    return (
        <Box
            w="100%"
            h="100%"
            bgColor="background.100"
            flex={1}
            alignItems="center"
            justifyContent="center">
            {user.isAnonymous ? (
                <Text color="plainText.800">User is a guest</Text>
            ) : (
                <>
                    <Text color="plainText.800">Account Email: {user.email}</Text>
                    <Text color="plainText.800">Email Verified: {String(user.emailVerified)}</Text>
                </>
            )}
            <Text color="plainText.800">User ID: {user.id}</Text>
            <Box py={3}>
                <Text color="plainText.800" bold>
                    Really fun user data counter: {user.count}
                </Text>
                <Button m={2} onPress={() => dispatch(incrementCount())}>
                    Increment Count
                </Button>
                <Button m={2} onPress={() => dispatch(decrementCount())}>
                    Decrement Count
                </Button>
            </Box>
            {user.isAnonymous ? (
                <Button mt="2" colorScheme="indigo" onPress={() => navigation.navigate('Auth')}>
                    Login to real account
                </Button>
            ) : null}
            <Button mt="2" colorScheme="indigo" onPress={handleLoginButton}>
                {user.loggedIn ? 'Logout' : 'Login'}
            </Button>
        </Box>
    );
};
