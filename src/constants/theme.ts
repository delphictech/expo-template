import { extendTheme, theme } from 'native-base';

/*
    This file defines the light and dark themes for nativebase and react navigation components
    The dark themes and react navigation compnents are all based on the light nativeBase theme
*/

const primaryColor = theme.colors.indigo;

export const nativeBaseLightTheme = extendTheme({
    // Add new color
    colors: {
        primary: primaryColor,
        background: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
        },
        plainText : {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        }
    }
});

export const nativeBaseDarkTheme = extendTheme({
    colors: {
        primary: primaryColor, // do not reverse primary
        // primary: {
        //     50: nativeBaseLightTheme.colors.primary['900'],
        //     100: nativeBaseLightTheme.colors.primary['800'],
        //     200: nativeBaseLightTheme.colors.primary['700'],
        //     300: nativeBaseLightTheme.colors.primary['600'],
        //     400: nativeBaseLightTheme.colors.primary['500'],
        //     500: nativeBaseLightTheme.colors.primary['400'],
        //     600: nativeBaseLightTheme.colors.primary['300'],
        //     700: nativeBaseLightTheme.colors.primary['200'],
        //     800: nativeBaseLightTheme.colors.primary['100'],
        //     900: nativeBaseLightTheme.colors.primary['50'],
        // },
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
        }
    }
});

/*
    Define the theming for react navigation
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
}

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
}
