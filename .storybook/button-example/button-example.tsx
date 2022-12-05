import React from 'react';
import { Button, Text } from 'native-base';
import { ButtonExampleProps } from './button-example.stories';

export const ButtonExample: React.FC<ButtonExampleProps> = ({
    onPress,
    backgroundColor,
    textColor,
}) => {
    return (
        <>
            <Button backgroundColor={backgroundColor} onPress={onPress}>
                <Text color={textColor}>This is the button</Text>
            </Button>
        </>
    );
};
