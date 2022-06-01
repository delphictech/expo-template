import React from 'react';
import { useState } from 'react';
import { FormControl, Input, Icon } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";

/*
For props:
    label: string
    type: text or password
    iconLeft: icon to put on the left
    onChangeText
    iconRight: icon to put on the right (or should only have this for password)
    validation: with yup afterwards (None, supported types)
*/
export interface FormInputProps {
    label: string;
    password?: boolean; // need default prop inputs
    icon?: typeof Icon;
    onChangeText?: () => void; // need to find out how to access the text input
    validation?: 'None'
};

export function FormInput(props: FormInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl>
        <FormControl.Label>{props.label}</FormControl.Label>
        <Input type={showPassword ? "text" : "password"}
            InputRightElement={<Icon as={<MaterialIcons name={
                                showPassword ? "visibility" : "visibility-off"} />} 
                        size={5} mr="2" color="muted.400" onPress={() => setShowPassword(!showPassword)} />}
        />
        </FormControl>
    );
}