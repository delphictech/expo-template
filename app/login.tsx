import React from "react";
import { View, Text } from "react-native";

// components
import { Input } from "~/components/ui/input";

export default function Login() {
  console.log('login fired')
  return (
    <View>
      <Text>login</Text>
      <Input />
      <Input />
    </View>
  );
};

