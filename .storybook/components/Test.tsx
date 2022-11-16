import React from 'react';
import { Text, Box, NativeBaseProvider } from 'native-base';
// import { View, Text } from 'react-native';

export const Test = ({ props, otherprops }) => {
    return (
        <Box>
            <Text>{props}</Text>
            <Text>{otherprops}</Text>
        </Box>

        // <View>
        //     <Box>
        //         <Text>dawdawdwa</Text>
        //         <Text>dawwad</Text>
        //     </Box>
        // </View>
    );
};
