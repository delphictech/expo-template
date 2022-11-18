import { extendTheme, theme } from 'native-base';
import { fontConfig } from 'src/constants/fonts';

/**
 * This file defines the light and dark themes for nativebase and react navigation components
 * The dark themes and react navigation compnents are all based on the light nativeBase theme
 */

/**
 * To setup fonts with nativebase, expo-font, and ts, view the following blog
 * https://dev.to/nerdjfpb/how-to-use-custom-google-font-with-react-native-expo-nativebase-and-typescript-3jf7
 */
const fontStyles = {
    heading: 'Nunito',
    body: 'Nunito',
    mono: 'Nunito',
};

/**
 * Add nativebase theming, can use base theme colors
 * https://docs.nativebase.io/default-theme
 */
export const nativeBaseLightTheme = extendTheme({
    colors: {
        primary: theme.colors.indigo,
        background: theme.colors.muted,
        plainText: theme.colors.blueGray,
    },
    fonts: fontStyles,
    fontConfig,
});

export const nativeBaseDarkTheme = extendTheme({
    colors: {
        primary: nativeBaseLightTheme.colors.primary,
        // background is opposite of light theme
        background: {
            50: nativeBaseLightTheme.colors.background['900'],
            100: nativeBaseLightTheme.colors.background['800'],
            200: nativeBaseLightTheme.colors.background['700'],
            300: nativeBaseLightTheme.colors.background['600'],
            400: nativeBaseLightTheme.colors.background['500'],
            500: nativeBaseLightTheme.colors.background['400'],
            600: nativeBaseLightTheme.colors.background['300'],
            700: nativeBaseLightTheme.colors.background['200'],
            800: nativeBaseLightTheme.colors.background['100'],
            900: nativeBaseLightTheme.colors.background['50'],
        },
        // text is opposite of light theme
        plainText: {
            50: nativeBaseLightTheme.colors.plainText['900'],
            100: nativeBaseLightTheme.colors.plainText['800'],
            200: nativeBaseLightTheme.colors.plainText['700'],
            300: nativeBaseLightTheme.colors.plainText['600'],
            400: nativeBaseLightTheme.colors.plainText['500'],
            500: nativeBaseLightTheme.colors.plainText['400'],
            600: nativeBaseLightTheme.colors.plainText['300'],
            700: nativeBaseLightTheme.colors.plainText['200'],
            800: nativeBaseLightTheme.colors.plainText['100'],
            900: nativeBaseLightTheme.colors.plainText['50'],
        },
    },
    fonts: fontStyles,
    fontConfig,
});

/**
 * Define theme for react navigation
 * https://reactnavigation.org/docs/themes/
 */
export const navigationLightTheme = {
    dark: false,
    colors: {
        primary: nativeBaseLightTheme.colors.primary['500'],
        background: nativeBaseLightTheme.colors.background['100'],
        card: nativeBaseLightTheme.colors.background['100'],
        text: nativeBaseLightTheme.colors.plainText['800'],
        border: nativeBaseLightTheme.colors.background['300'],
        notification: 'rgb(255, 69, 58)',
    },
};

export const navigationDarkTheme = {
    dark: true,
    colors: {
        primary: nativeBaseDarkTheme.colors.primary['500'],
        background: nativeBaseDarkTheme.colors.background['100'],
        card: nativeBaseDarkTheme.colors.background['100'],
        text: nativeBaseDarkTheme.colors.plainText['800'],
        border: nativeBaseDarkTheme.colors.background['300'],
        notification: 'rgb(255, 69, 58)',
    },
};
