import React from 'react';
import { Box, Text } from 'native-base';

export const ExploreScreen: React.FC<any> = () => {
    return (
        <Box
            w="100%"
            h="100%"
            bgColor="background.100"
            flex={1}
            alignItems="center"
            justifyContent="center">
            <Text color="plainText.800">Explore Screen</Text>
        </Box>
    );
};
