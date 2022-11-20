import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { EditProfileScreen } from './edit-profile-screen';

export default {
    title: 'Edit Profile Screen',
    component: EditProfileScreen,
};

export interface EditProfileProps {}

const Template = (args: EditProfileProps) => <EditProfileScreen {...args} />;

export const Basic: Story<EditProfileProps> = Template.bind({});
Basic.args = {};
