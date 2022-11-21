import { Story } from '@storybook/react';
import React from 'react';
import { ImageUploader, ImageArgProps } from '.';

export default {
    title: 'Image Uploader',
    component: ImageUploader,
};

const Template = (args: ImageArgProps) => <ImageUploader {...args} />;

export const Basic: Story<ImageArgProps> = Template.bind({});
Basic.args = {
    imageProp: 'https://wallpaperaccess.com/full/317501.jpg',
    stylingProps: {
        bRadius: 50,
    },
    size: '2xl',
};

export const Default: Story<ImageArgProps> = Template.bind({});
Default.args = {
    imageProp: 'https://wallpaperaccess.com/full/317501.jpg',
    stylingProps: {},
};
