import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { ImageUploader } from './image-uploader';
import { imageArgProps } from 'src/types/component/image-uploader';

export default {
    title: 'Image Uploader',
    component: ImageUploader,
    // args: {},
};

const Template = (args: imageArgProps) => <ImageUploader {...args} />;

export const Basic: Story<imageArgProps> = Template.bind({});
Basic.args = {
    imageProp: 'https://wallpaperaccess.com/full/317501.jpg',
    stylingProps: {
        bRadius: 50,
        size: '2xl',
    },
};
