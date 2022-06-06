import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SignupModal } from 'components/modals';
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
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button mt="2" colorScheme="indigo" onPress={() => setShowModal(true)}>
                Sign up
            </Button>
        </View>
        <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </>

    );
}
