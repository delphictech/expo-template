import React, { useState } from "react";
import { Alert } from 'react-native';
import { Text, Modal } from "native-base";

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
};

export const BottomModal: React.FC<BottomModalProps> = (props) => {
    // states
    const [internalIsOpen, setIsOpen] = useState(true);

    // function to check if modal should close
    const checkClose = () => {
        props.inputActive
        ? Alert.alert('Are you sure you want to exit?', 'Your progress will not be saved.', 
                    [{ text: "Exit", onPress: () => props.onClose(), style: "destructive"},
                    { text: "Return", onPress: () => console.log("Ask me later pressed"), style: "cancel" }],
                    { cancelable: false }
                    )
        : props.onClose();
    }

    return (
        <Modal 
            closeOnOverlayClick={false}
            isOpen={props.isOpen}
            // isOpen={props.isOpen && internalIsOpen}
            onClose={props.onClose}
            avoidKeyboard
            size="full"
            animationPreset="slide">
            <Modal.Content variant="fullScreen" marginBottom={0} marginTop={"auto"}>
                <Modal.CloseButton onPress={() => checkClose()}/>
                {/* <Modal.CloseButton /> */}
                <Modal.Header alignItems={"center"}>
                    <Text fontSize={"lg"} fontWeight={"semibold"}>
                        {props.title}
                    </Text>
                </Modal.Header>
                <Modal.Content>
                    {props.children}
                </Modal.Content>
            </Modal.Content>
        </Modal>
    );
}