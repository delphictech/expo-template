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
    placeholder?: string; // used as the grey placeholder text within the container
    password?: boolean; // need default prop inputs, will automatically set props if password
    errorMessage?: string | undefined; // will signal if there is an error on the form input
    defaultValue?: string | undefined; // default value to put into form controller
};

export const FormInput: React.FC<FormInputParams> = (props) => {
    /*
        Component that will validate the user input and renders a form input
    */
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (

        <FormControl key='testing' isInvalid={props.isInvalid} >
            <FormControl.Label >{props.label}</FormControl.Label>
                <Controller 
                    key="email"
                    name='email'
                    control={props.control}
                    defaultValue={props.defaultValue}
                    render={({field: {onBlur, onChange, value}}) => (
                        <Input value={value} onBlur={onBlur} onChangeText={onChange} 
                        w="100%" maxW="300px" placeholder="name@example.com" size="lg" clearButtonMode="while-editing" autoCapitalize="none" />
                    )}
                />
                {
                    props.isInvalid ?
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
                        {props.errorMessage}
                    </FormControl.ErrorMessage> : null
                }
        </FormControl>

        // <FormControl isInvalid={isError}>
        //     <FormControl.Label >{props.label}</FormControl.Label>
        //     { props.password 
        //         ? <Input {...props} ref={ref} value={value} w="100%" maxW="300px" placeholder={props.placeholder} onChangeText={changeText} type={showPassword ? "text" : "password"} size="lg" autoCapitalize={props.capitalize}
        //         InputRightElement={<Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" 
        //         onPress={() => setShowPassword(!showPassword)} />} onEndEditing={props.onEndEditing} clearButtonMode="while-editing"/>
        //         : <Input {...props} ref={ref} value={value} w="100%" maxW="300px" onEndEditing={props.onEndEditing} onChangeText={changeText} placeholder={props.placeholder} size="lg" clearButtonMode="while-editing" autoCapitalize={props.capitalize}/>
        //     }
        //     {
        //         isError ?
        //         <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
        //             {props.errorMessage}
        //         </FormControl.ErrorMessage> : null
        //     }
            
        // </FormControl>
    );
}