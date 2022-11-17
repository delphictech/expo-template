import React from 'react';
import { Test } from './Test';

export default {
    title: 'test',
    component: Test,
    args: {
        props: 'thingy',
        otherprops: 'helllllo',
    },
};

const Template = (args: any) => <Test {...args} />;

export const red: any = Template.bind({});
red.args = {
    props: 'red',
    otherprops: 'red2',
};
