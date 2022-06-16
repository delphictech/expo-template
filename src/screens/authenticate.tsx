import React, { useEffect, useState } from 'react';
import { Center, Box, VStack, Button, Image, Heading } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { useAppDispatch, useAppSelector } from 'src/hooks/useful-ducks';
import { FormInput } from 'src/components/user-input';
import { KeyboardBehaviorWrapper } from 'src/components/wrappers';
import { signInWithEmail, signUpWithEmail } from 'src/firebase/api';


export interface AuthScreenProps {
    /*
        Function to call on the submit of the button
    */
    onSubmit?: () => void;
    /* 
        Boolean for when screen nested in modal, used to clear user inputs
    */
    isModalOpen?: boolean | undefined;
    /*
        Will specify if safe area needed
    */
    safeArea?: boolean | undefined;
    /*
        Will specify if content should be centered vertically
    */
    centered?: boolean | undefined;
    /*
        Will specify if want logo and title header
    */
    title?: boolean | undefined;
    /*
        Callback for when an input has been actively edited
    */
   onEndEditing?: () => void;

};

export const AuthScreen: React.FC<AuthScreenProps> = (props) => {
    /*
        Component will authenticate the user, 
        either signing them in or offering them the authentication methods that are available to their account
    */
    // react states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [isPasswordVis, setPasswordVis] = useState(false);
    const [isConfirmVis, setConfirmVis] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // redux states and dispatch hook
    const userID = useAppSelector((state) => state.user.uid);
    const userEmail = useAppSelector((state) => state.user.email);
    const dispatch = useAppDispatch();

    // initialize states
    useEffect(() => {
        setPasswordVis(false);
        setConfirmVis(false);
    }, [props.isModalOpen]);

    // async function for handling login
    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await signInWithEmail(email, password);
            console.log(`User 0: ${response[0]}`);
            console.log(`User 1: ${response[1]}`);
            // dispatch(signIn(response.user));
            console.log(`User type: ${typeof response}`);
        } catch(e: any) {
            if (e.code === 'auth/user-not-found') {
                setConfirmVis(true);
            } else {
                console.log('Error with login');
                console.log(e);
            }
        }
        setIsLoading(false);
        props.onSubmit && props.onSubmit();
    }

    // async function for handling sign up
    const handleSignUp = async () => {
        try {
            const response = await signUpWithEmail(email, password);
            console.log(response.user);
            // dispatch(signIn(response.user));
            console.log(`User 0: ${response[0]}`);
            console.log(`User 1: ${response[1]}`);
            console.log(`User type: ${typeof response}`);
        } catch(e: any) {
            console.log('Error with sign up');
            console.log(e);
        }
        
        // must handle the errors
        props.onSubmit && props.onSubmit();
    }

    return (
        <KeyboardBehaviorWrapper bounces={false} centerVertically={props.centered} >
            <Box px="10" w="100%" h="100%" justifyContent={props.centered ? "center" : "flex-start"} alignItems="center" safeArea={props.safeArea ? true : undefined}>
                <VStack space={3} alignItems="center" w="100%">
                    {
                        props.title && 
                        <>
                            <Image alignSelf="center" alt='Logo' source={require('assets/icon.png')} style={{ width: 150, height: 150 }}/>
                            <Heading mb={3}>Welcome to Maet!</Heading>
                        </>
                    }
                    <FormInput label="Enter your email" placeholder="name@example.com" isModalOpen={props.isModalOpen} onEndEditing={props.onEndEditing} onChangeText={(text: string) => setEmail(text)} />
                    {/* <Button mt="3" colorScheme="primary" w="100%" disabled>
                        Send me a sign-in link
                    </Button> */}
                    <Button w="100%" colorScheme="secondary" onPress={() => setPasswordVis(true)} isDisabled={isPasswordVis} >
                        Enter a password instead
                    </Button>
                    <Button w="100%" colorScheme="primary" variant="link" onPress={() => setPasswordVis(true)} isDisabled={isPasswordVis} >
                        Continue as guest
                    </Button>
                    {/* <FormInput placeholder="Enter a password instead" password={true} isModalOpen={props.isModalOpen} onEndEditing={props.onEndEditing} onChangeText={(text: string) => setPassword(text)} /> */}
                    {/* {   
                        isPasswordVis &&
                        <Animatable.View animation="fadeIn">
                            <FormInput label="Enter your password" placeholder="Password" password={true} isModalOpen={props.isModalOpen} onEndEditing={props.onEndEditing} onChangeText={(text: string) => setPassword(text)} />
                        </Animatable.View>
                    } */}
                    {/* {
                        isPasswordVis && !isConfirmVis &&
                        <Animatable.View animation="fadeIn">
                            <Button mt="3" colorScheme="primary" onPress={handleLogin} isLoading={isLoading} isLoadingText="Submitting" >
                                Submit
                            </Button>
                        </Animatable.View>
                    } */}
                    {/* {
                        isConfirmVis &&
                        <Animatable.View animation="fadeIn">
                            <FormInput label="Confirm your password" placeholder="Password" password={true} isModalOpen={props.isModalOpen} onEndEditing={props.onEndEditing} onChangeText={(text: string) => setConfirm(text)} />
                            <Button mt="5" colorScheme="primary" onPress={handleSignUp} isLoading={isLoading} isLoadingText="Signing Up" >
                                Sign Up
                            </Button>
                        </Animatable.View>
                    } */}
                </VStack>
            </Box>
        </KeyboardBehaviorWrapper>
        
    );
}
