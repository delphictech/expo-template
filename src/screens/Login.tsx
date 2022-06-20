import React, { useEffect, useState } from 'react';
import { Center, Box, VStack, Button, Image, Heading, FormControl, Input, WarningOutlineIcon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from "react-hook-form";
import { FormInput } from 'src/components/user-input';
import { KeyboardBehaviorWrapper } from 'src/components/wrappers';
import { anonymousSignIn, fetchSignInMethods } from 'src/firebase/api';
import { useAppSelector } from 'src/hooks/useful-ducks';
import { AuthStackParams } from 'src/navigation/auth-stack';
import { ScreenParams } from 'src/types/screen';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email('Invalid Email'),
});


type LoginScreenProps = StackNavigationProp<AuthStackParams, "Email">;

export const LoginScreen: React.FC<ScreenParams> = (props: ScreenParams) => {

    const imageSource = require('assets/icon.png');

    // hooks 
    const navigation = useNavigation<LoginScreenProps>();
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const isAnonymous = useAppSelector((state) => state.user.isAnonymous);

    // react states
    const [isEmailLoading, setEmailLoading] = useState<boolean>(false);
    const [isGuestLoading, setIsGuestLoading] = useState<boolean>(false);


    const handleEmail = async (data: any) => {
        console.log(data);
        setEmailLoading(true);
        try {
            const methods = await fetchSignInMethods(data.email);
            setEmailLoading(false);

            // reset react form and navigate to new screen
            reset();
            navigation.navigate('AuthEmail', {
                signInMethods: methods,
                email: data.email
            });
        } catch (e: any) {
            console.log(`Error with email: ${e}`);
            setEmailLoading(false);
        }
    }

    const handleAnonymous = async () => {
        setIsGuestLoading(true);
        try {
            const response = await anonymousSignIn();
        } catch (e: any) {
            console.log(`Error with Guest sign in ${e}`);
        }
    }

    return (
        <KeyboardBehaviorWrapper bounces={false} centerVertically={!isAnonymous} key='asdfasdfas' >
            <Box px="10" w="100%" h="100%" justifyContent={!isAnonymous ? "center" : "flex-start"} alignItems="center" safeArea={!isAnonymous ? true : undefined}>
                <VStack space={3} alignItems="center" w="100%">
                    {
                        !isAnonymous ? 
                        <>
                            <Image alignSelf="center" alt='Logo' source={imageSource} style={{ width: 150, height: 150 }}/>
                            <Heading mb={3}>Welcome to Maet!</Heading>
                        </> : null
                    }

                <FormControl key='testing' isInvalid={'email' in errors} >
                    <FormControl.Label >Input your email</FormControl.Label>
                    <Controller 
                        key="email"
                        name='email'
                        control={control}
                        defaultValue=''
                        render={({field: {onBlur, onChange, value}}) => (
                                <Input value={value} onBlur={onBlur} onChangeText={onChange} 
                                w="100%" maxW="300px" placeholder="name@example.com" size="lg" clearButtonMode="while-editing" autoCapitalize="none" />
                        )}
                    />
                    {
                        'email' in errors ?
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
                            {errors.email.message}
                        </FormControl.ErrorMessage> : null
                    }
                    </FormControl>
                    {/* 
                                                <FormControl isInvalid={Boolean(errorMessage.length)} >
                                <FormControl.Label >Input your email</FormControl.Label>
                                    <Input value={email} w="100%" maxW="300px" onChangeText={(text: string) => setEmail(text)} placeholder="name@example.com" size="lg" clearButtonMode="while-editing" autoCapitalize="none" />
                                {
                                    errorMessage.length ?
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
                                        {errorMessage}
                                    </FormControl.ErrorMessage> : null
                                }
                            </FormControl>
                    */}
                    {/* <FormInput key="Main-Login-Email" label="Enter your email" placeholder="name@example.com" 
                        onChangeText={(text: string) => setEmail(text)} errorMessage={errors.email?.message} /> */}
                    {/* <Button mt="3" colorScheme="primary" w="100%" disabled>
                        Send me a sign-in link
                    </Button> */}
                    <Button key="Password-Button" w="100%" colorScheme="secondary" onPress={handleSubmit(handleEmail)} isLoading={isEmailLoading} isLoadingText='Submitting'>
                        Submit
                    </Button>
                    { 
                        !isAnonymous ?
                        <Button w="100%" colorScheme="primary" variant="link" onPress={handleAnonymous} isLoading={isGuestLoading} isLoadingText='Continuing' >
                            Continue as guest
                        </Button> : null
                    }
                </VStack>
            </Box>
        </KeyboardBehaviorWrapper>
        
    );
}
