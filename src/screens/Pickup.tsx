import React from 'react';
import { Center, Box, Heading, VStack, Button, Text } from 'native-base';

export interface PickupSessionProps {
    /* 
        Boolean for when screen nested in modal, used to clear user inputs
    */
    isModalOpen?: boolean | null;
    /*
        Callback for when an input has been actively edited
    */
   onEndEditing?: () => void;
};

export const PickupSession: React.FC<PickupSessionProps> = (props) => {

    return (
        <Center w="100%" h="full">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                
                <VStack space={3} mt="5">
                    <Text>HI pickup players</Text>
                </VStack>
            </Box>
        </Center>
        
    );
}
