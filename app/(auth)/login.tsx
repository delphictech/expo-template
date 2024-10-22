import { Link, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { LoginComponent } from "~/components/login";
import { Button } from "~/components/ui/button";

export default function Login() {
  console.log("login fired");

  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({ headerShown: false });
  // }, [navigation]);

  return (
    <View className="w-100">
      <LoginComponent />
      {/* <Button variant="destructive">
        <Text>Default button from library</Text>
      </Button> */}
      <View className="w-full flex justify-center items-center">
        <Text className="text-red-500 text-center my-4">Don't have an account?</Text>
      
      <Link href="/signup">Signup</Link>
      </View>
    </View>
  );
}

export const options = {
  headerShown: false, // Hide the header
};