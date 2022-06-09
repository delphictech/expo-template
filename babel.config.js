module.exports = function babel(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          alias: {
            src: './src',
            navigation: './src/navigation',
            screens: './src/screens',
            constants: './src/constants',
            components: './src/components',
            features: './src/features',
            'firebase-api': './src/firebase/api',
            utils: './src/utils'
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      ], 'module:react-native-dotenv',
    ],
  };
};
