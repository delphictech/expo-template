import { Story } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, FormInputParams } from './form-input';

export default {
    title: 'Form input',
    component: FormInput,
};

const Template = (args: FormInputParams) => {
    const { control } = useForm();
    return <FormInput control={control} {...args} />;
};

export const Example: Story<FormInputParams> = Template.bind({});

Example.args = {
    name: 'firstName',
};
