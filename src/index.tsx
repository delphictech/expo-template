import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, extendTheme } from "native-base";
import { Provider } from 'react-redux';
import { SSRProvider } from "@react-aria/ssr";
import { FirebaseReduxToolkitProvider } from 'src/components/wrappers';
import RootNavigator from 'src/navigation';
import { store } from 'src/ducks/store';
import { nativeBaseTheme } from 'src/constants/theme';

export default function App() {
  const theme = extendTheme(nativeBaseTheme);

  return (
    <>
      <StatusBar />
      <Provider store={store}>
        <FirebaseReduxToolkitProvider>
          <SSRProvider>
            <NativeBaseProvider theme={theme}>
              <RootNavigator />
            </NativeBaseProvider>
          </SSRProvider>
        </FirebaseReduxToolkitProvider>
      </Provider>
    </>
  );
}
