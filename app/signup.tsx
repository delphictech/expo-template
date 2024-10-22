import React from "react";
import { View, Text } from "react-native";
import { LoginComponent } from "~/components/login";

// components
import { Input } from "~/components/ui/input";

export default function Signup() {
  console.log('login fired')
  return (
   <LoginComponent />
  );
};

