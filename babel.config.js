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
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      ],
    ],
  };
};
