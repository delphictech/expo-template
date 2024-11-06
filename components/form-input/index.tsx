import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "../ui/input";
import { Control, Controller } from "react-hook-form";

export interface FormInputParams {
  control: Control<any, any>; // control passed into react-hook-form controller input: https://www.react-hook-form.com/get-started#IntegratingwithUIlibraries
  name: string; // required for the react-hook-form controller
  isInvalid?: boolean | undefined; // will set if form is invalid or not
  label?: string | undefined; // used as the title label above the input
  password?: boolean; // need default prop inputs, will automatically set props if password
  errorMessage?: string | undefined; // will signal if there is an error on the form input
  defaultValue?: string | undefined; // default value to put into form controller
  placeholder?: string | undefined;
  // _inputParams?: IInputProps;
}

export const FormInput: React.FC<FormInputParams> = ({
  control,
  name,
  isInvalid,
  label,
  password,
  errorMessage,
  defaultValue,
  placeholder,
  ...controlParams
}) => {
    const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onBlur, onChange, value } }) => (
          <View>
            {password ? (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={placeholder}
                // type={showPassword ? "text" : "password"}
                secureTextEntry={true}
                // InputRightElement={
                //   <Icon
                //     as={
                //       <MaterialIcons
                //         name={showPassword ? "visibility" : "visibility-off"}
                //       />
                //     }
                //     size={5}
                //     mr="2"
                //     color="muted.400"
                //     onPress={() => setShowPassword(!showPassword)}
                //   />
                // }
                // {..._inputParams}
              />
            ) : (
              <Input
                value={value}
                selectionColor="plainText.500"
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                secureTextEntry={true}

                // {..._inputParams}
              />
            )}
          </View>
        )}
      />

      {/* <Input /> */}
    </View>
  );
};
