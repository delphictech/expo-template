// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// for error resolving assets
config.resolver.assetExts.push("cjs");

// for svg support: https://github.com/kristerkari/react-native-svg-transformer#for-expo-sdk-v4100-or-newer
const { transformer, resolver } = config;
config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };


module.exports = config;
