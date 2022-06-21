import React from 'react';
import { Alert, HStack, VStack, Text, IconButton, CloseIcon } from 'native-base';

/*
    in future have different types including
        success
        warning
        error
        welcome
*/

export interface AlertToastParams {
    title: string;
    type: 'success' | 'warning' | 'error' | 'info' | 'welcome';
    toExit?: () => void; // function to close the toast
    message?: string | undefined;
}

export const AlertToast: React.FC<AlertToastParams> = (props) => {
    return (
        <Alert px={5} variant="solid" status='error'>
            <VStack space={2} flexShrink={1} w="100%" px={3}>
                <HStack space={2} justifyContent='space-between'>
                    <HStack space={2} flexShrink={1} alignItems="center">
                        <Alert.Icon />
                        <Text fontSize="md" fontWeight="medium" color="white">{props.title}</Text>
                    </HStack>
                    <IconButton alignSelf='flex-end' variant="unstyled" icon={<CloseIcon size="3" color="white" />} onPress={props.toExit} />
                </HStack>
                <Text pl="6" color='white'>
                    {props.message}
                </Text>
            </VStack>
        </Alert>
    );
};
