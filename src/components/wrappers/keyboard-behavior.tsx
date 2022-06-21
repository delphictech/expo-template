import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

export interface KeyboardBehaviorProps {
    children?: React.ReactNode;
    style?: Object | undefined;
    bounces?: boolean | undefined;
    centerVertically?: boolean | undefined;
}

export const KeyboardBehaviorWrapper: React.FC<KeyboardBehaviorProps> = (props) => {
    return (
        <KeyboardAwareScrollView
            bounces={props.bounces}
            contentContainerStyle={
                props.centerVertically && { flexGrow: 1, justifyContent: 'center' }
            }>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={props.style}>{props.children}</View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};
