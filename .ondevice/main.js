module.exports = {
    stories: [
        '../.storybook/button-example/**/*.stories.?(ts|tsx|js|jsx)',
        '../src/components/**/*.stories.?(ts|tsx|js|jsx)',
        '../src/screens/**/*.stories.?(ts|tsx|js|jsx)',
    ],
    addons: [
        '@storybook/addon-ondevice-notes',
          "@storybook/addon-ondevice-controls",
        '@storybook/addon-ondevice-backgrounds',
        '@storybook/addon-ondevice-actions',
    ],
};
