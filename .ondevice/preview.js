import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { NativeBaseProvider } from 'native-base';

export const decorators = [
    withBackgrounds,
    (Story) => (
        <NativeBaseProvider>
            <Story />
        </NativeBaseProvider>
    ),
];

export const parameters = {
    backgrounds: [
        { name: 'plain', value: 'white', default: true },
        { name: 'warm', value: 'hotpink' },
        { name: 'cool', value: 'deepskyblue' },
    ],
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
