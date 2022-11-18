import { Story } from '@storybook/react';
import React from 'react';
import { ImageArgProps } from 'src/types/component/image-uploader';
import { EditProfileScreen } from './edit-profile-screen';

export default {
    title: 'Edit Profile Screen',
    component: EditProfileScreen,
};

const Template = (args: any) => <EditProfileScreen {...args} />;

export const Basic: Story<ImageArgProps> = Template.bind({});
Basic.args = {};
