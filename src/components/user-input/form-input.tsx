import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native';
import { FormControl, Input, Icon, WarningOutlineIcon, IInputProps } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import { Control, Controller, FieldValues } from 'react-hook-form';

/*
Props extend from nativebase IInputProps props
*/
export interface FormInputParams extends IInputProps {
    control: Control<FieldValues, any>; // control passed into react-hook-form controller input: https://www.react-hook-form.com/get-started#IntegratingwithUIlibraries
    name: string; // required for the react-hook-form controller
    isInvalid?: boolean | undefined; // will set if form is invalid or not
    label?: string | undefined; // used as the title label above the input
    password?: boolean; // need default prop inputs, will automatically set props if password
    errorMessage?: string | undefined; // will signal if there is an error on the form input
    defaultValue?: string | undefined; // default value to put into form controller
};

export const FormInput: React.FC<FormInputParams> = (props) => {
    /*
        Component that will validate the user input and renders a form input
    */
   // destructure props so that inputParams can be inputted cleanly into nativebase input component
    const { control, name, isInvalid, label, password, errorMessage, defaultValue, 
            ...inputParams} = props;

    // states
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl key='testing' isInvalid={props.isInvalid} >
            <FormControl.Label >{props.label}</FormControl.Label>
                <Controller 
                    key="email"
                    name={props.name}
                    control={props.control}
                    defaultValue={props.defaultValue}
                    render={({field: {onBlur, onChange, value}}) => (
                        <>
                            { props.password ?
                                <Input value={value} onBlur={onBlur} onChangeText={onChange} w="100%" maxW="300px" placeholder={props.placeholder} type={showPassword ? "text" : "password"} size="lg" 
                                    InputRightElement={
                                        <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" 
                                        onPress={() => setShowPassword(!showPassword)} />
                                    } clearButtonMode="while-editing" autoCapitalize='none' {...inputParams}/>
                                : <Input value={value} onBlur={onBlur} onChangeText={onChange} w="100%" maxW="300px" size="lg" clearButtonMode="while-editing" autoCapitalize="none" {...inputParams} />
                            }  
                        </>
                    )}
                />
                {
                    props.isInvalid ?
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
                        {props.errorMessage}
                    </FormControl.ErrorMessage> : null
                }
        </FormControl>
    );
}