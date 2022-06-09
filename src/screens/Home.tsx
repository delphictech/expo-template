import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SignupModal, PickupSessionModal } from 'components/modals';
import { Button } from 'native-base';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function HomeScreen() {
    const [showPickupSession, setPickupSession] = useState(false);
    const [showSignup, setSignup] = useState(false);

    return (
        <>
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button mt="2" colorScheme="indigo" onPress={() => setSignup(true)}>
                Schedule Pickup
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={() => setPickupSession(true)}>
                Start Pickup Session
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={() => setSignup(true)}>
                Login
            </Button>
        </View>
        <PickupSessionModal isOpen={showPickupSession} onClose={() => setPickupSession(false)} />
        <SignupModal isOpen={showSignup} onClose={() => setSignup(false)} />
        </>

    );
}
