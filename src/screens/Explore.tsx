import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface ExploreScreenParams {
    test?: undefined
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const ExploreScreen: React.FC<ExploreScreenParams> = () => {
    return (
        <View style={styles.container}>
            <Text>Explore Screen</Text>
        </View>
    );
}
