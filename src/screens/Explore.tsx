import React from 'react';
import { Box, Button, Text } from 'native-base';
import { ScreenParams } from 'src/types/screen';

export const ExploreScreen: React.FC<ScreenParams> = (props: ScreenParams) => {
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
