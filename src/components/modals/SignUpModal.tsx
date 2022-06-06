import React, { useState } from "react";
import { BottomModal } from "components/wrappers";
import { SignupScreen } from "screens";

export interface SignUpModalProps {
    isOpen: boolean; // will trigger whether to have modal open or closed
    onClose: () => void;
    // navigation for where to close?
};

export const SignupModal: React.FC<SignUpModalProps> = (props) => {

    return (
        <BottomModal title="Sign Up" isOpen={props.isOpen} onClose={props.onClose}>
            <SignupScreen/>
        </BottomModal>
    );
}