import { Story } from '@storybook/react';
import React from 'react';
import { FormInput, FormInputParams } from './form-input';

export default {
    title: 'Form input',
    component: FormInput,
};

const Template = (args: FormInputParams) => <FormInput {...args} />;

export const Example: Story<FormInputParams> = Template.bind({});
Example.args = {};
