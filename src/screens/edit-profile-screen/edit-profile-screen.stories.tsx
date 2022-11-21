import { Story } from '@storybook/react';
import React from 'react';
import { EditProfileScreen, EditProfileProps } from '.';

export default {
    title: 'Edit Profile Screen',
    component: EditProfileScreen,
};

const Template = (args: EditProfileProps) => <EditProfileScreen {...args} />;

export const Basic: Story<EditProfileProps> = Template.bind({});
Basic.args = {};
