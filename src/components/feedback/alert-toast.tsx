import React from 'react';
import { Alert, HStack, VStack, Text, IconButton, CloseIcon, IAlertProps, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

/*
    in future have different types including
        success
        warning
        error
        welcome
*/

export interface AlertToastParams extends IAlertProps {
    title: string;
    toExit?: () => void | undefined; // function to close the toast
    message?: string | undefined;
    type?: 'danger' | 'warning' | 'success' | 'primary' | undefined;
    icon?: JSX.Element | undefined;
}

export const AlertToast: React.FC<AlertToastParams> = (props) => {

    // destructure props to access alert props
    const { title, toExit, message, icon, type, ...alertParams } = props;

    // icons
    const icons = {
        'danger': 'error-outline',
        'warning': 'warning',
        'success': 'check-circle-outline',
        'primary': 'account-circle'
    }

    return (
        <Alert px={5} colorScheme={type} variant="solid" {...alertParams} >
            <VStack space={2} flexShrink={1} w="100%" px={3}>
                <HStack space={2} justifyContent='space-between'>
                    <HStack space={2} flexShrink={1} alignItems="center">
                        {
                            (type && !icon) ? 
                            <Icon as={MaterialIcons} name={icons[type]} color="white" size={18} />
                            : null
                        }
                        { icon }
                        <Text fontSize="md" fontWeight="medium" color="white">{props.title}</Text>
                    </HStack>
                    {
                        toExit ?
                        <IconButton alignSelf='flex-end' variant="unstyled" icon={<CloseIcon size="3" color="white" />} onPress={props.toExit} />
                        : null
                    }
                </HStack>
                {
                    message ?
                    <Text pl="6" color='white'>
                        {props.message}
                    </Text> 
                    : null
                }
                
            </VStack>
        </Alert>
    );
};
