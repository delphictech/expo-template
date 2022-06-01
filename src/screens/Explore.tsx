import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function ExploreScreen() {
    return (
        <View style={styles.container}>
            <Text>Explore Screen</Text>
        </View>
    );
}
