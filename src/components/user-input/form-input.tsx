import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native';
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
    label?: string | null;
    placeholder?: string;
    password?: boolean; // need default prop inputs
    icon?: typeof Icon;
    onChangeText?: (text: string) => void; // need to find out how to access the text input
    onEndEditing?: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
    isModalOpen?: boolean | null; // used when forms are in modal to clear input on close
    validation?: 'None';
};

export const FormInput: React.FC<FormInputProps> = (props) => {
    /*
        Component that will validate the user input and renders a form input
    */
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const changeText = (text: string) => {
        setValue(text);
        props.onChangeText && props.onChangeText(text);
    }

    // set empty inputs everytime modal open or closed
    useEffect(() => {
        setValue('');
    }, [props.isModalOpen])

    return (
        <FormControl>
            <FormControl.Label >{props.label}</FormControl.Label>
            { props.password 
                ? <Input value={value} w="100%" maxW="300px" onChangeText={changeText} placeholder={props.placeholder} type={showPassword ? "text" : "password"} size="lg"
                InputRightElement={<Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" 
                onPress={() => setShowPassword(!showPassword)} />} onEndEditing={props.onEndEditing} clearButtonMode="while-editing"/>
                : <Input value={value} w="100%" maxW="300px" onEndEditing={props.onEndEditing} onChangeText={changeText} placeholder={props.placeholder} size="lg" clearButtonMode="while-editing"/>
            }
        </FormControl>
    );
}