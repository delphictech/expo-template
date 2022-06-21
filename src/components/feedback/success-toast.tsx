import React from 'react';
import { Alert, HStack, VStack, Text } from 'native-base';

/*
    in future have different types including
    success
    warning
    error
    welcome
*/

export interface SuccessToastParams {
    message?: string | undefined;
}

export const SuccessToast: React.FC<SuccessToastParams> = (props) => {

    return (
        <Alert w="100%" variant="solid" colorScheme="success" status="success">
            <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                <HStack space={2} flexShrink={1} alignItems="center">
                    <Alert.Icon />
                    <Text color="white">
                        {props.message}
                    </Text>
                </HStack>
                </HStack>
            </VStack>
        </Alert>
    );
}