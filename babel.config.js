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
            assets: './assets'
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg'],
        },
      ], 'module:react-native-dotenv', 'react-native-reanimated/plugin',
    ],
  };
};
