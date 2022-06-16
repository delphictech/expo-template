import React, { useState } from 'react';
import { Center, Box, VStack, Button, Image, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { FormInput } from 'src/components/user-input';
import { KeyboardBehaviorWrapper } from 'src/components/wrappers';
import { anonymousSignIn, fetchSignInMethods } from 'src/firebase/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParams } from 'src/navigation/auth-stack';

export interface LoginScreenParams {
    /*
        Function to call on the submit of the button
    */
    onSubmit?: () => void;
    /* 
        Boolean for when screen nested in modal, used to clear user inputs
    */
    isModalOpen?: boolean | undefined;
    /*
        Will specify if the signup screen is full screen, will render safe area, center it, and create a title.
    */
    main?: boolean | undefined;
    /*
        Callback for when an input has been actively edited
    */
   onEndEditing?: () => void;

};

type LoginScreenProps = StackNavigationProp<AuthStackParams, "Auth">;

export const LoginScreen: React.FC<LoginScreenParams> = (props) => {
    // set initial value for full screen to true, if modal not open and main undefined
    const isMain = (props.main) ? !props.isModalOpen : true;

    // navigation 
    const navigation = useNavigation<LoginScreenProps>();

    // react states
    const [email, setEmail] = useState<string>('');
    const [isEmailLoading, setEmailLoading] = useState<boolean>(false);
    const [isGuestLoading, setIsGuestLoading] = useState<boolean>(false);

    const handleEmail = async () => {
        setEmailLoading(true);
        try {
            const methods = await fetchSignInMethods(email);
        } catch (e: any) {
            console.log(`Error with email ${e}`);
        }
        setEmailLoading(false);
        navigation.navigate('Auth');
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
        <KeyboardBehaviorWrapper bounces={false} centerVertically={isMain} key='asdfasdfas' >
            <Box px="10" w="100%" h="100%" justifyContent={isMain ? "center" : "flex-start"} alignItems="center" safeArea={isMain ? true : undefined}>
                <VStack space={3} alignItems="center" w="100%">
                    {
                        isMain && 
                        <>
                            <Image alignSelf="center" alt='Logo' source={require('assets/icon.png')} style={{ width: 150, height: 150 }}/>
                            <Heading mb={3}>Welcome to Maet!</Heading>
                        </>
                    }
                    <FormInput key="Main-Login-Email" label="Enter your email" placeholder="name@example.com" isModalOpen={props.isModalOpen} onEndEditing={props.onEndEditing} onChangeText={(text: string) => setEmail(text)} />
                    {/* <Button mt="3" colorScheme="primary" w="100%" disabled>
                        Send me a sign-in link
                    </Button> */}
                    <Button key="Password-Button" w="100%" colorScheme="secondary" onPress={handleEmail} isLoading={isEmailLoading} isLoadingText='Submitting'>
                        Submit
                    </Button>
                    { 
                        isMain &&
                        <Button w="100%" colorScheme="primary" variant="link" onPress={handleAnonymous} isLoading={isGuestLoading} isLoadingText='Continuing' >
                            Continue as guest
                        </Button>
                    }
                </VStack>
            </Box>
        </KeyboardBehaviorWrapper>
        
    );
}
