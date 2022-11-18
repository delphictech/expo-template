import { Story } from '@storybook/react';
import React from 'react';
import { ImageArgProps } from 'src/types/component/image-uploader';
import { ImageUploader } from './image-uploader';

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
