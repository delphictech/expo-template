import { Story } from '@storybook/react';
import { InterfaceIconProps } from 'native-base/lib/typescript/components/primitives/Icon/types';
import React from 'react';
import { Color } from 'react-native-svg';
import { LogoIcon } from 'src/components/logo-icon';

export default {
    title: 'Logo Icon',
    component: LogoIcon,
};

const Template = (args: { color?: Color } & InterfaceIconProps) => <LogoIcon {...args} />;

export const Basic: Story<{ color?: Color } & InterfaceIconProps> = Template.bind({});
Basic.args = {
    color: 'green',
};
