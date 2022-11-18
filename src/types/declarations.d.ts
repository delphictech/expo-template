/**
 * Declarations for react-native-svg transformer, which is used to render the logo throughout the app
 * https://github.com/kristerkari/react-native-svg-transformer#using-typescript
 */

declare module '*.svg' {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';

    const content: React.FC<SvgProps>;
    export default content;
}
