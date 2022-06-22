import { extendTheme } from 'native-base';

export const nativeBaseLightTheme = extendTheme({
    // Add new color
    colors: {
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
    // Add new color
    colors: {
        // background is opposite of light theme
        background: {
            50: '#171717',
            100: '#262626',
            200: '#404040',
            300: '#525252',
            400: '#737373',
            500: '#a3a3a3',
            600: '#d4d4d4',
            700: '#e5e5e5',
            800: '#f5f5f5',
            900: '#fafafa',
        },
        plainText: {
            50: '#111827',
            100: '#1f2937',
            200: '#374151',
            300: '#4b5563',
            400: '#6b7280',
            500: '#9ca3af',
            600: '#d1d5db',
            700: '#e5e7eb',
            800: '#f3f4f6',
            900: '#f9fafb',     
        }
    }
});
