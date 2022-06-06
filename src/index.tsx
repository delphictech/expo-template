import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, extendTheme } from "native-base";
import { nativeBaseTheme } from 'constants/theme';
import { SSRProvider } from "@react-aria/ssr";
import RootNavigator from 'navigation';

export default function App() {
  const theme = extendTheme(nativeBaseTheme);

  return (
    <>
      <StatusBar />
      <SSRProvider>
        <NativeBaseProvider theme={theme}>
          <RootNavigator />
        </NativeBaseProvider>
      </SSRProvider>
    </>
  );
}
