import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginModal } from 'src/components/modals';
import { useAppDispatch, useAppSelector } from 'src/hooks/useful-ducks';
import { signOut } from 'src/ducks/user-slice';
import { signOutUser } from 'src/firebase/api';
import { Button } from 'native-base';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export function HomeScreen() {
    const [showPickupSession, setPickupSession] = useState(false);
    const [showSignup, setSignup] = useState(false);

    // navigation
    const navigation = useNavigation();

    // redux handlers
    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector((state) => state.user.loggedIn);
    const isAnonymous = useAppSelector((state) => state.user.isAnonymous);
    const user = useAppSelector((state) => state.user);
    console.log(`Anonymous In: ${isAnonymous}`);

    // handling button functions
    const handleLoginButton = async () => {
        if (loggedIn) {
            let res = await signOutUser();
            console.log('SIgned out');
            console.log(res);
        } else {
            setSignup(true);
        }
    }

    return (
        <>
        <View style={styles.container}>
            <Text>Home Screen: {user.email}</Text>
            <Button mt="2" colorScheme="indigo" onPress={() => setPickupSession(true)}>
                Schedule Pickup
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={() => navigation.navigate('PickupSession')}>
                Start Pickup Session
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={handleLoginButton}>
                {loggedIn ? 'Logout' : 'Login'}
            </Button>
        </View>
        {/* <LoginModal isOpen={showSignup} onClose={() => setSignup(false)} /> */}
        </>

    );
}
