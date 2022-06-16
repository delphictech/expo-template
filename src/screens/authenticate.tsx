import React, { useEffect, useState } from 'react';
import { Center, Box, VStack, Button, Image, Heading } from 'native-base';
import { useAppDispatch, useAppSelector } from 'src/hooks/useful-ducks';
import { FormInput } from 'src/components/user-input';
import { KeyboardBehaviorWrapper } from 'src/components/wrappers';
import { signInWithEmail, signUpWithEmail } from 'src/firebase/api';
import { ScreenParams } from 'src/types/screen';


export const AuthScreen: React.FC<ScreenParams> = (props: ScreenParams) => {
    /*
        Component will authenticate the user, 
        either signing them in or offering them the authentication methods that are available to their account
    */
   const placeholder = true;
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
    }

    return (
        <KeyboardBehaviorWrapper bounces={false} centerVertically={placeholder} >
            <Box px="10" w="100%" h="100%" justifyContent={placeholder ? "center" : "flex-start"} alignItems="center" safeArea={placeholder ? true : undefined}>
                <VStack space={3} alignItems="center" w="100%">
                    {
                        <>
                            <Image alignSelf="center" alt='Logo' source={require('assets/icon.png')} style={{ width: 150, height: 150 }}/>
                            <Heading mb={3}>Welcome to Maet!</Heading>
                        </>
                    }
                    <FormInput label="Enter your email" placeholder="name@example.com" onChangeText={(text: string) => setEmail(text)} />
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
