import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native'; 
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, useColorMode } from 'native-base';
import { Provider } from 'react-redux';
import { SSRProvider } from '@react-aria/ssr';
import RootNavigator from 'src/navigation';
import { store } from 'src/ducks/store';
import { nativeBaseLightTheme, nativeBaseDarkTheme } from 'src/constants/theme';

export default function App() {

    // hook to find user preference for color scheme
    const scheme = useColorScheme();
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        toggleColorMode();
    }, [scheme]);
    
    return (
        <>
            <StatusBar />
            <Provider store={store}>
                    <SSRProvider>
                        <NativeBaseProvider theme={scheme === 'dark' ? nativeBaseDarkTheme : nativeBaseLightTheme}>
                            <RootNavigator scheme={scheme} />
                        </NativeBaseProvider>
                    </SSRProvider>
            </Provider>
        </>
    );
}
