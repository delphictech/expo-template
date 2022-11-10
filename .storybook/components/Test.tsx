import React from 'react';
// import {Text, Box, NativeBaseProvider} from 'native-base'
import { View, Text } from 'react-native';
import { Box } from 'native-base';

export const Test = ({ props, otherprops }) => {
    return (
        <View>
            <Text>{props}</Text>
            <Text>{otherprops}</Text>
        </View>
        // <View>
        //     <Box>
        //         <Text>dawdawdwa</Text>
        //         <Text>dawwad</Text>
        //     </Box>
        // </View>
    );
};
