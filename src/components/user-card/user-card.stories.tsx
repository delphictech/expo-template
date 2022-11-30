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
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Fb8%2Ffa%2Fbd%2Fb8fabd8d052d5187484ca9dd7e6badb5--apples-biographies.jpg&f=1&nofb=1&ipt=fca586aca3fe180f36948bf3c3d885639d6d6aba901d52b9c618a317595a12ea&ipo=images',
};
