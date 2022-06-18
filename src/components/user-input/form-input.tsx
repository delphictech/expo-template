import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native';
import { FormControl, Input, Icon, WarningOutlineIcon, IInputProps } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";

/*
Props extend from nativebase Input props
*/
export interface FormInputProps extends IInputProps {
    label?: string | null; // used as the title label above the input
    placeholder?: string; // used as the grey placeholder text within the container
    password?: boolean; // need default prop inputs
    icon?: typeof Icon; // icon that is on the left side of the form input
    errorMessage?: string | undefined; // will signal if there is an error on the form input
    isModalOpen?: boolean | null; // used when forms are in modal to clear input on close
    validation?: 'None';
    capitalize?: 'none' | 'characters' | 'sentences' | 'words' | undefined;
};

export const FormInput = React.forwardRef<typeof Input, FormInputProps>((props: FormInputProps, ref) => {
    /*
        Component that will validate the user input and renders a form input
    */
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const isError = Boolean(props.errorMessage?.length);

    const changeText = (text: string) => {
        setValue(text);
        props.onChangeText && props.onChangeText(text);
    }

    // set empty inputs everytime modal open or closed
    useEffect(() => {
        setValue('');
    }, [props.isModalOpen])

    return (
        <FormControl isInvalid={isError}>
            <FormControl.Label >{props.label}</FormControl.Label>
            { props.password 
                ? <Input {...props} ref={ref} value={value} w="100%" maxW="300px" placeholder={props.placeholder} onChangeText={changeText} type={showPassword ? "text" : "password"} size="lg" autoCapitalize={props.capitalize}
                InputRightElement={<Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" 
                onPress={() => setShowPassword(!showPassword)} />} onEndEditing={props.onEndEditing} clearButtonMode="while-editing"/>
                : <Input {...props} ref={ref} value={value} w="100%" maxW="300px" onEndEditing={props.onEndEditing} onChangeText={changeText} placeholder={props.placeholder} size="lg" clearButtonMode="while-editing" autoCapitalize={props.capitalize}/>
            }
            {
                isError ?
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
                    {props.errorMessage}
                </FormControl.ErrorMessage> : null
            }
            
        </FormControl>
    );
});