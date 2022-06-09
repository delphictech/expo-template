import React, { useEffect, useState } from 'react';
import { Center, Box, Heading, VStack, Button } from 'native-base';
import { FormInput } from 'components/user-input';
import { KeyboardBehaviorWrapper } from 'components/wrappers';
import { signInWithEmail, signUpWithEmail } from 'firebase-api';
import * as Animatable from 'react-native-animatable';

export interface SignupScreenProps {
    /*
        Function to call on the submit of the button
    */
    onSubmit?: () => void;
    /* 
        Boolean for when screen nested in modal, used to clear user inputs
    */
    isModalOpen?: boolean | null;
    /*
        Callback for when an input has been actively edited
    */
   onEndEditing?: () => void;
};

export const SignupScreen: React.FC<SignupScreenProps> = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVis, setPasswordVis] = useState(false);
    const [isConfirmVis, setConfirmVis] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPasswordVis(false);
        setConfirmVis(false);
    }, [props.isModalOpen]);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await signInWithEmail(email, password);
            console.log('reresponse');
            console.log(response);
        } catch(e: any) {
            console.log('ERRRORRO');
            switch (e.code) {
                case 'auth/invalid-email':
                    break;
                case 'auth/user-disabled':
                    break;
                case 'auth/user-not-found':
                    setConfirmVis(true);
                case 'auth/wrong-password':
                    break;
            }
            console.log(e);
        }
        setIsLoading(false);
        
    }

    const handleSignUp = async () => {
        // signUpWithEmail(email, password);
        props.onSubmit && props.onSubmit();
    }

    return (
        <KeyboardBehaviorWrapper>
            <Center w="100%">
                <Box p="2" w="90%" maxW="300" >
                    <VStack space={3} mt="3">
                        <FormInput label="Enter your email" placeholder="name@example.com" isModalOpen={props.isModalOpen} onEndEditing={props.onEndEditing} onChangeText={(text: string) => setEmail(text)} />
                        <Button mt="3" colorScheme="primary" >
                            Send me a sign-in link
                        </Button>
                        <Button colorScheme="primary" variant="outline" onPress={() => setPasswordVis(true)} isDisabled={isPasswordVis} >
                            Enter a password instead
                        </Button>
                        {/* <FormInput placeholder="Enter a password instead" password={true} isModalOpen={props.isModalOpen} onEndEditing={props.onEndEditing} onChangeText={(text: string) => setPassword(text)} /> */}
                        {   
                            isPasswordVis &&
                            <Animatable.View animation="fadeIn">
                                <FormInput label="Enter your password" placeholder="Password" password={true} isModalOpen={props.isModalOpen} onEndEditing={props.onEndEditing} onChangeText={(text: string) => setPassword(text)} />
                            </Animatable.View>
                        }
                        {
                            isPasswordVis && !isConfirmVis &&
                            <Animatable.View animation="fadeIn">
                                <Button mt="3" colorScheme="primary" onPress={handleLogin} isLoading={isLoading} isLoadingText="Submitting" >
                                    Submit
                                </Button>
                            </Animatable.View>
                        }
                        {
                            isConfirmVis &&
                            <Animatable.View animation="fadeIn">
                                <FormInput label="Confirm your password" placeholder="Password" password={true} isModalOpen={props.isModalOpen} onEndEditing={props.onEndEditing} onChangeText={(text: string) => setPassword(text)} />
                                <Button mt="5" colorScheme="primary" onPress={handleSignUp} isLoading={isLoading} isLoadingText="Signing Up" >
                                    Sign Up
                                </Button>
                            </Animatable.View>
                        }
                    </VStack>
                </Box>
            </Center>
        </KeyboardBehaviorWrapper>
        
    );
}
