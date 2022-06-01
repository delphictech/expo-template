import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from "native-base";
import RootNavigator from 'navigation';

export default function App() {
  return (
    <>
      <StatusBar />
      <NativeBaseProvider>
        <RootNavigator />
      </NativeBaseProvider>
    </>
  );
}
