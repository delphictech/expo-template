import React, { useEffect, useState } from "react";
import { BottomModal } from "components/wrappers";
import { SignupScreen } from "screens";

export interface SignUpModalProps {
    isOpen: boolean; // will trigger whether to have modal open or closed
    onClose: () => void;
    // navigation for where to close?
};

export const SignupModal: React.FC<SignUpModalProps> = (props) => {
    // state for handling active input
    const [inputActive, setInputActive] = useState(false);

    useEffect(() => {
        setInputActive(!props.isOpen)
    }, [props.isOpen])

    return (
        <BottomModal title="Sign Up" 
            isOpen={props.isOpen} 
            inputActive={inputActive}
            onClose={props.onClose}>
            <SignupScreen isModalOpen={props.isOpen} 
                onEndEditing={() => setInputActive(true)}
                onSubmit={props.onClose}/>
        </BottomModal>
    );
}