import React, { useEffect, useState } from "react";
import { BottomModal } from "components/wrappers";
import { PickupSession } from "screens";

export interface PickupSessionModalProps {
    isOpen: boolean; // will trigger whether to have modal open or closed
    onClose: () => void;
    // navigation for where to close?
};

export const PickupSessionModal: React.FC<PickupSessionModalProps> = (props) => {
    // state for handling active input
    const [inputActive, setInputActive] = useState(false);

    useEffect(() => {
        setInputActive(!props.isOpen)
    }, [props.isOpen])

    return (
        <BottomModal title="Play Pickup" 
            isOpen={props.isOpen} 
            inputActive={inputActive}
            onClose={props.onClose}>
            <PickupSession isModalOpen={props.isOpen} />
        </BottomModal>
    );
}