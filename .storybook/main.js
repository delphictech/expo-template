module.exports = {
    stories: [
        // './stories/**/*.stories.?(ts|tsx|js|jsx)',
        '../src/components/**/*.stories.?(ts|tsx|js|jsx)',
    ],
    addons: [
        '@storybook/addon-essentials',
        // '@storybook/addon-interactions',
        '@storybook/addon-react-native-web',
    ],
    framework: '@storybook/react',
};

// module.exports = {
//     stories: [
//       "../components/**/*.stories.mdx",
//       "../components/**/*.stories.@(js|jsx|ts|tsx)",
//     ],
//     addons: [
//       "@storybook/addon-links",
//       "@storybook/addon-essentials",
//       "@storybook/addon-react-native-web",
//     ],
//     framework: "@storybook/react",
//   };
