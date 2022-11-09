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

export const thing = (args) => <Test {...args} />;
