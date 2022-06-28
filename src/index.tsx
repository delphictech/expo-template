import React from 'react';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { SSRProvider } from '@react-aria/ssr';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import RootNavigator from 'src/navigation';
import { store } from 'src/ducks/store';
import { nativeBaseLightTheme, nativeBaseDarkTheme } from 'src/constants/theme';

const persistor = persistStore(store);

export const App = () => {
    // hook to find user preference for color scheme
    const scheme = useColorScheme();

    return (
        <>
            <StatusBar />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SSRProvider>
                        <NativeBaseProvider
                            theme={scheme === 'dark' ? nativeBaseDarkTheme : nativeBaseLightTheme}>
                            <RootNavigator scheme={scheme} />
                        </NativeBaseProvider>
                    </SSRProvider>
                </PersistGate>
            </Provider>
        </>
    );
};
