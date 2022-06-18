import React, { useEffect, useState } from 'react';
import { Center, Box, VStack, Button, Image, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FormInput } from 'src/components/user-input';
import { KeyboardBehaviorWrapper } from 'src/components/wrappers';
import { signInWithEmail, signUpWithEmail } from 'src/firebase/api';
import { useAppSelector } from 'src/hooks/useful-ducks';
import { AuthStackParams } from 'src/navigation/auth-stack';
import { ScreenParams } from 'src/types/screen';

type AuthEmailProps = StackNavigationProp<AuthStackParams, "AuthEmail" >;

export const AuthEmail: React.FC<ScreenParams> = ({route}) => {

    // navigation 
    const navigation = useNavigation<AuthEmailProps>();
    
    // route params
    const signInMethods: Array<string> = route.params.signInMethods;
    const email: string = route.params.email;

    // react states
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // handle login
    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await signInWithEmail(email, password);
        } catch(e: any) {
            console.log(`Error with login: ${e}`);
        }
    }

    // handle sign up
    const handleSignup = async () => {
        setIsLoading(true);
        try {
            const response = await signUpWithEmail(email, password);
        } catch(e: any) {
            console.log(`Error with sign up: ${e}`);
        }
    }

    return (
        <KeyboardBehaviorWrapper bounces={false} >
            <Box px="10" w="100%" h="100%" justifyContent="flex-start" alignItems="center" >
                <VStack space={3} alignItems="center" w="100%" >
                    {
                        !signInMethods.length ?
                        <>
                            <FormInput key="Password" password label="Enter a password" placeholder="Password" onChangeText={(text: string) => setPassword(text)} capitalize='none' />
                            <FormInput key="Confirm-Password" password label="Confirm your password" placeholder="Confirm Password" onChangeText={(text: string) => setConfirm(text)} capitalize='none' />
                            <Button key="Password-Button" w="100%" colorScheme="secondary" onPress={null} isLoading={isLoading} isLoadingText='Signing Up' >
                                Sign Up
                            </Button>
                        </> : null
                    }
                    {
                        signInMethods.includes('password') ?
                        <>
                            <FormInput key="Password" password label="Enter your password" placeholder="Password" onChangeText={(text: string) => setPassword(text)} capitalize='none' />
                            <Button alignSelf="flex-end" variant="link" mb={6}>
                                    Forget Password?
                            </Button>
                            <Button key="Password-Button" w="100%" colorScheme="secondary" onPress={handleLogin} isLoading={isLoading} isLoadingText='Logging In'>
                                Login
                            </Button>
                        </> : null
                    }
                    {/* <Button mt="3" colorScheme="primary" w="100%" disabled>
                        Send me a sign-in link
                    </Button> */}
                </VStack>
            </Box>
        </KeyboardBehaviorWrapper>
    );
}
