import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenParams } from 'src/types/screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const ExploreScreen: React.FC<ScreenParams> = (props: ScreenParams) => {
    return (
        <View style={styles.container}>
            <Text>Explore Screen</Text>
        </View>
    );
};
