import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoginModal, PickupSessionModal } from 'src/components/modals';
import { useAppDispatch, useAppSelector } from 'src/hooks/useful-ducks';
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

    // redux states
    const loggedIn = useAppSelector((state) => state.user.loggedIn);
    const user = useAppSelector((state) => state.user);
    console.log(`Logged In: ${loggedIn}`);

    return (
        <>
        <View style={styles.container}>
            <Text>Home Screen: {user.email}</Text>
            <Button mt="2" colorScheme="indigo" onPress={() => setSignup(true)}>
                Schedule Pickup
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={() => setPickupSession(true)}>
                Start Pickup Session
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={() => setSignup(true)}>
                {loggedIn ? 'Logout' : 'Login'}
            </Button>
        </View>
        <PickupSessionModal isOpen={showPickupSession} onClose={() => setPickupSession(false)} />
        <LoginModal isOpen={showSignup} onClose={() => setSignup(false)} />
        </>

    );
}
