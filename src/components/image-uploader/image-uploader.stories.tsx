import React from 'react';
import { ImageUploader } from './image-uploader';

export default {
    title: 'Image Uploader',
    component: ImageUploader,
    args: {
        props: 'thingy',
        otherprops: 'helllllo',
    },
};

const Template = (args: any) => <ImageUploader {...args} />;

export const Basic: any = Template.bind({});
Basic.args = {
    props: 'red',
    otherprops: 'red2',
};

