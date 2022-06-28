import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

export interface KeyboardBehaviorProps {
    children?: React.ReactNode | undefined;
    style?: Object | undefined;
    bounces?: boolean;
    centerVertically?: boolean;
}

export const KeyboardBehaviorWrapper: React.FC<KeyboardBehaviorProps> = ({
    children,
    style,
    bounces,
    centerVertically,
}) => {
    return (
        <KeyboardAwareScrollView
            bounces={bounces}
            contentContainerStyle={centerVertically && { flexGrow: 1, justifyContent: 'center' }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={style}>{children}</View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

KeyboardBehaviorWrapper.defaultProps = {
    children: undefined,
    style: undefined,
    bounces: false,
    centerVertically: true,
};
