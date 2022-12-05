import { Story } from '@storybook/react';
import React from 'react';
import { UserCard, UserCardParams } from 'src/components/user-card';

export default {
    title: 'User Card',
    component: UserCard,
};

const Template = (args: UserCardParams) => <UserCard {...args} />;

export const Basic: Story<UserCardParams> = Template.bind({});
Basic.args = {
    firstName: 'Steve',
    lastName: 'Jobs',
    count: 4,
    image: 'https://i.pinimg.com/736x/b8/fa/bd/b8fabd8d052d5187484ca9dd7e6badb5--apples-biographies.jpg',
};

export const Broken: Story<UserCardParams> = Template.bind({});
Broken.args = {
    firstName: 'Broken',
    lastName: 'Link',
    count: 4,
    image: 'https://i.pin-biographies.jpg',
};
