import React from 'react';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export interface KeyboardBehaviorProps {
    children: React.ReactNode;
};

export const KeyboardBehaviorWrapper: React.FC<KeyboardBehaviorProps> = (props) => {

    return (
        <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                {props.children}
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};