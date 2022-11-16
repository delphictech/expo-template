import { NativeBaseProvider } from 'native-base';

export const decorators = [
    (Story) => (
        <NativeBaseProvider>
            <Story />
        </NativeBaseProvider>
    ),
];
export const parameters = {};
