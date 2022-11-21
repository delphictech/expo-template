// import { Story } from '@storybook/react';
// import React from 'react';
// import { AlertToast, AlertToastParams } from 'src/components/feedback/alert-toast';

// export default {
//     title: 'Alert Toast',
//     component: AlertToast,
//     argTypes: { toExit: { action: 'toExit' } },
// };

// const Template = (args: AlertToastParams) => <AlertToast {...args} />;

// export const Primary: Story<AlertToastParams> = Template.bind({});
// Primary.args = {
//     title: 'Primary Alter Toast',
//     message: 'Check this out',
//     toExit: () => console.log('hi'),
// };

import { Story } from '@storybook/react';
import React from 'react';
import { AlertToast, AlertToastParams } from 'src/components/feedback/alert-toast';

export default {
    title: 'Alert Toast',
    component: AlertToast,
};

const Template = (args: AlertToastParams) => <AlertToast {...args} />;

export const Basic: Story<AlertToastParams> = Template.bind({});
Basic.args = {
    title: 'Primary Alter Toast',
    message: 'Check this out',
    toExit: () => console.log('hi'),
};
