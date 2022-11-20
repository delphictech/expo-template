import { Story } from '@storybook/react';
import React from 'react';
import { ButtonExample } from './button-example';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Basic Button',
    component: ButtonExample,
};

const Template = (args) => <ButtonExample {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    onPress: action('Pressed'),
};
