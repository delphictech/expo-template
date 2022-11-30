// const addons = (process.env.STORYBOOK_START = true
//     ? [
//           '@storybook/addon-essentials',
//           '@storybook/addon-interactions',
//           '@storybook/addon-react-native-web',
//           //   '@storybook/addon-console',
//           '@storybook/addon-docs',
//       ]
//     : []);

module.exports = {
    stories: [
        './button-example/**/*.stories.?(ts|tsx|js|jsx)',
        '../src/components/**/*.stories.?(ts|tsx|js|jsx)',
        '../src/screens/**/*.stories.?(ts|tsx|js|jsx)',
    ],
    addons: [
        '@storybook/addon-essentials',
        // '@storybook/addon-interactions',
        '@storybook/addon-react-native-web',
        // '@storybook/addon-console',
        '@storybook/addon-docs',
    ],
    framework: '@storybook/react',
};
