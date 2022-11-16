import React from 'react';
import { Test } from '../components/Test';

export default {
    title: 'test',
    component: Test,
    args: {
        props: 'thingy',
        otherprops: 'helllllo',
    },
};

const Template = (args) => <Test {...args} />;

export const red = Template.bind({});
red.args = {
    props: 'red',
    otherprops: 'red2',
};
