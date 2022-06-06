import * as React from "react";
import { Text, Modal } from "native-base";

export interface BottomModalProps {
    title: string;
    isOpen: boolean; // will trigger whether to have modal open or closed
    onClose: () => void;
    // navigation for where to close?
};

export const BottomModal: React.FC<BottomModalProps> = (props) => {

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            avoidKeyboard
            size="full"
            animationPreset="slide">
            <Modal.Content variant="fullScreen" marginBottom={0} marginTop={"auto"}>
                <Modal.CloseButton />
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