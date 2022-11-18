import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { EditProfileScreen } from './edit-profile-screen';
import { imageArgProps } from 'src/types/component/image-uploader';

export default {
    title: 'Edit Profile Screen',
    component: EditProfileScreen,
   
};

const Template = (args: any) => <EditProfileScreen {...args} />;

export const Basic: Story<imageArgProps> = Template.bind({});
Basic.args = {};
