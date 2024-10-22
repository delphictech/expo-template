import React from "react";
import { Input } from "./ui/input";
import { View, Text } from "react-native";

export const LoginComponent = () => {
  return (
    <View className="px-5">
      <Text>login</Text>

      <Text>Enter your Email</Text>
      <Input />
    </View>
  );
};
