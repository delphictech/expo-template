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
            _backdrop={{
            bg: "grey.500",
            }}
            animationPreset="slide">
            <Modal.Content variant="fullScreen">
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