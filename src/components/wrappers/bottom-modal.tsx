import React from 'react';
import { Alert } from 'react-native';
import { Text, Modal } from 'native-base';

export interface BottomModalProps {
    title: string;
    isOpen: boolean; // will trigger whether to have modal open or closed
    onClose: () => void;

    /*  
    Following prop used to determine if modal should confirm closing before exiting.
    Specifies whether there is active input in the form
    */
    inputActive?: boolean | null;
    // navigation for where to close?
}

export const BottomModal: React.FC<BottomModalProps> = ({
    title,
    isOpen,
    onClose,
    inputActive,
    children,
}) => {
    // function to check if modal should close
    const checkClose = () => {
        if (inputActive) {
            Alert.alert(
                'Are you sure you want to exit?',
                'Your progress will not be saved.',
                [
                    { text: 'Exit', onPress: () => onClose(), style: 'destructive' },
                    {
                        text: 'Return',
                        onPress: () => null,
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );
        } else {
            onClose();
        }
    };

    return (
        <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            avoidKeyboard
            size="full"
            animationPreset="slide">
            <Modal.Content height="2xl" marginBottom={0} marginTop="auto">
                <Modal.CloseButton onPress={() => checkClose()} />
                {/* <Modal.CloseButton /> */}
                <Modal.Header alignItems="center">
                    <Text fontSize="lg" fontWeight="semibold">
                        {title}
                    </Text>
                </Modal.Header>
                <Modal.Content>{children}</Modal.Content>
            </Modal.Content>
        </Modal>
    );
};

BottomModal.defaultProps = {
    inputActive: false,
};
