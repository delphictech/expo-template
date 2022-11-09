import React from 'react';
import { Button } from 'react-native';

export default {
    title: 'React Native Button',
    component: Button,
    args: {
        title: 'Hello world',
    },
};

export const Basic = (args) => (
    <>
        <Button {...args} />
    </>
);
