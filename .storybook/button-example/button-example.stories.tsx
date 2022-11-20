import { Story } from '@storybook/react';
import React from 'react';
import { ButtonExample } from './button-example';
import { action } from '@storybook/addon-actions';
import { GestureResponderEvent } from 'react-native';

export default {
    title: 'Basic Button',
    component: ButtonExample,
};

export interface ButtonExampleProps {
    backgroundColor?: string;
    textColor?: string;
    onPress?: (event: GestureResponderEvent) => void;
}

const Template = (args: ButtonExampleProps) => <ButtonExample {...args} />;

export const Basic = Template.bind({});

Basic.args = {
    onPress: action('Pressed'),
    backgroundColor: 'red.600',
    textColor: 'blue.500',
};

export const Cool = Template.bind({});

Cool.args = {
    backgroundColor: 'blue.300',
    textColor: 'black.500',
};
