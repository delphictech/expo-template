// import { StorybookConfig } from '@storybook/core-common';

module.exports = {
    stories: [
        // '../components/**/*.stories.?(ts|tsx|js|jsx)'
        './stories/**/*.stories.?(ts|tsx|js|jsx)',
    ],
    addons: ['@storybook/addon-interactions', '@storybook/addon-react-native-web'],
    framework: '@storybook/react',
};

// const config: StorybookConfig = {
//     core: {
//         builder: 'webpack5',
//     },
//     features: {
//         babelModeV7: true,
//         interactionsDebugger: true,
//         postcss: false,
//     },
//     // stories: ['../src/**/*stories.mdx', '../src/**/*stories.@(ts|tsx)'],
//     stories: ['./stories/**/*.stories.?(ts|tsx|js|jsx)'],

//     addons: [
//         // '@storybook/addon-essentials',
//         '@storybook/addon-interactions',
//         '@storybook/addon-react-native-web',
//     ],
//     framework: '@storybook/react',
// };

// export default config;
