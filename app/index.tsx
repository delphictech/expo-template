import { Redirect } from "expo-router";
import React from "react";
import { useAppSelector } from "~/redux/useful-hooks";

export default function RootNavigator() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  console.log("loggedIn", loggedIn);

  if (loggedIn) {
    // User is not logged in, redirect to /login
    return <Redirect href="/(auth)/login" />;
  }

  // User is logged in, redirect to the home screen or render the main app
  return <Redirect href="/(tabs)" />;

}
