import React from "react";
import { Input } from "./ui/input";
import { View, Text } from "react-native";
import { FormInput } from "./form-input";
import { useForm } from "react-hook-form";

export const LoginComponent = () => {
    
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<NewEmailSchemaType>({
        resolver: yupResolver(newEmailSchema),
    });

  return (
    <View className="px-5">
      {/* <Text>login</Text> */}
      <FormInput control={control} name="test" />
    </View>
  );
};
