module.exports = {
    stories: [
        '../src/components/**/*.stories.?(ts|tsx|js|jsx)',
        '../src/screens/**/*.stories.?(ts|tsx|js|jsx)',
    ],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-react-native-web',
    ],
    framework: '@storybook/react',
};
