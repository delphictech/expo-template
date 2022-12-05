import { Story } from '@storybook/react';
import React from 'react';
import { AlertToast, AlertToastParams } from 'src/components/alert-toast';

export default {
    title: 'Alert Toast',
    component: AlertToast,
};

const Template = (args: AlertToastParams) => <AlertToast {...args} />;

export const Basic: Story<AlertToastParams> = Template.bind({});
Basic.args = {
    title: 'Primary Alter Toast',
    message: 'Check this out',
};
